import { CallToolResult, Tool } from "@modelcontextprotocol/sdk/types.js";
import { GDGOCIPB_WEB_API_RESPONSE, makeGDGOCAPIRequest } from "../../utils/apirequest.js";

export let gdgoc_ipb_community_service_tool: Tool[] = [
  {
    name: "get-gdgoc-ipb-community-check-member",
    description: `Get Google Developer Group on Campus IPB Member Check.`,
    inputSchema: {
      type: "object",
      properties: {
        instagram: { type: "string", description: "Instagram profile username (e.g. @gdgoc.ipb)" },
        nama_lengkap: { type: "string", description: "Nama Lengkap User" },
        asal_universitas: { type: "string", description: "Asal Universitas User (Tidak boleh singkatan)" },
        fakultas: { type: "string", description: "Fakultas User" },
        email: { type: "string", description: "Email User" },
      },
      required: ["instagram", "nama_lengkap", "asal_universitas", "fakultas", "email"],
    },
  },
  {
    name: "get-gdgoc-ipb-community-add-member",
    description: `Get Google Developer Group on Campus IPB Member Registration.`,
    inputSchema: {
      type: "object",
      properties: {
        instagram: { type: "string", description: "Instagram profile username (e.g. @gdgoc.ipb)" },
        nama_lengkap: { type: "string", description: "Nama Lengkap User" },
        gdg_profile: { type: "string", description: "Link to GDG profile (must start with https://gdg.community.dev/u/)" },
        student_number: { type: "string", description: "Nomor Induk Mahasiswa atau Student Number" },
        asal_universitas: { type: "string", description: "Asal Universitas User (Tidak boleh singkatan)" },
        fakultas: { type: "string", description: "Fakultas User" },
        program_studi_departemen: { type: "string", description: "Program Studi / Departemen User" },
        tahun_angkatan: { type: "string", description: "Tahun Angkatan (format: 4-digit year, e.g., 2025)" },
        gdg_join: { type: "boolean", description: "Apakah pernah bergabung dengan GDG chapter sebelumnya?" },
        other_community: { type: "string", description: "Komunitas lain yang pernah diikuti (optional)" },
        motivasi: { type: "string", description: "Motivasi untuk bergabung (10–255 karakter)" },
        harapan: { type: "string", description: "Harapan terhadap komunitas (10–255 karakter)" },
        kontribusi: { type: "string", description: "Kontribusi yang ingin diberikan (10–255 karakter)" },
        toc: { type: "boolean", description: "Persetujuan terhadap Terms and Conditions (harus true)" },
        email: { type: "string", description: "Email User" }
      },
      required: [ "instagram", "nama_lengkap", "gdg_profile", "student_number", "asal_universitas", "fakultas", 
        "program_studi_departemen", "tahun_angkatan", "gdg_join", "motivasi", "harapan", "kontribusi", "toc", "email" ]
    },
  },
];

interface MemberCheckInput {
    instagram: string;
    nama_lengkap: string;
    asal_universitas: string;
    fakultas: string;
    email: string;
};

interface MemberAddInput {
  instagram: string;
  nama_lengkap: string;
  gdg_profile: string;
  student_number: string;
  asal_universitas: string;
  fakultas: string;
  program_studi_departemen: string;
  tahun_angkatan: string;
  gdg_join: boolean;
  other_community?: string;
  motivasi: string;
  harapan: string;
  kontribusi: string;
  toc: true;
  email: string;
}

export let gdgoc_ipb_community_service_check_member = async (instagram: string, nama_lengkap: string, asal_universitas: string, fakultas: string, email: string): Promise<CallToolResult> => {
  let APIUrl = "registration/check-member";
  let body = {instagram, nama_lengkap, asal_universitas, fakultas, email} as MemberCheckInput
  let formattedMembers = await fetchAndFormatMember(APIUrl, body);

  if (formattedMembers && formattedMembers.length > 0) {
    return {
      content: [
        {
          type: "text",
          text: formattedMembers.join("\n\n"), 
        },
      ],
      isError: false,
    };
  } else {
    return {
      content: [
        {
          type: "text",
          text: `No member information found for GDGOC IPB.`,
        },
      ],
      isError: true,
    };
  }
};

export let gdgoc_ipb_community_service_add_member = async (instagram: string, nama_lengkap: string, gdg_profile: string, student_number: string, asal_universitas: string, fakultas: string, 
  program_studi_departemen: string, tahun_angkatan: string, gdg_join: boolean, other_community: string | undefined, motivasi: string, harapan: string, kontribusi: string, toc: true, email: string): Promise<CallToolResult> => {
  
  let APIUrl = "registration/add-member";
  let body = { instagram, nama_lengkap, gdg_profile, student_number, asal_universitas, fakultas, program_studi_departemen, tahun_angkatan, gdg_join, other_community, motivasi, harapan, kontribusi, toc, email } as MemberAddInput;
  let formattedMembers = await fetchAndFormatAddMember(APIUrl, body);

  if (formattedMembers && formattedMembers.length > 0) {
    return {
      content: [
        {
          type: "text",
          text: formattedMembers.join("\n\n"), 
        },
      ],
      isError: false,
    };
  } else {
    return {
      content: [
        {
          type: "text",
          text: `No member information found for GDGOC IPB.`,
        },
      ],
      isError: true,
    };
  }
};

interface CheckedMemberData {
  nama_lengkap: string;
  email: string;
  submitted_at: Date;
  asal_universitas: string;
  fakultas: string;
  program_studi_departemen: string;
  instagram: string;
  linkedin: string;
}

function formatMember(member: CheckedMemberData): string {
  return [
      `Nama Lengkap: ${member.nama_lengkap || "Unknown"}`,
      `Email: ${member.email || "Secret"}`,
      `Submitted At: ${member.submitted_at ? new Date(member.submitted_at).toLocaleString() : "Unknown"}`,
      `Asal Universitas: ${member.asal_universitas || "Unknown"}`,
      `Fakultas: ${member.fakultas || "Unknown"}`,
      `Program Studi / Departemen: ${member.program_studi_departemen || "Unknown"}`,
      `Instagram: ${member.instagram || "Unknown"}`,
      `LinkedIn: ${member.linkedin || "Secret"}`,
      "---",
  ].join("\n");
}
  
async function fetchAndFormatMember(
    apiUrl: string,
    body: any
  ): Promise<string[] | null> {
    const fetchResponse = await makeGDGOCAPIRequest<GDGOCIPB_WEB_API_RESPONSE<CheckedMemberData>>(apiUrl, {
      method: "POST",
      body,
    });
  
    if (fetchResponse && fetchResponse.data) {
      return fetchResponse.data.map(formatMember);
    } else {
      console.error("Failed to fetch and format member data.");
      return null;
    }
}

async function fetchAndFormatAddMember(
  apiUrl: string,
  body: any
): Promise<string[] | null> {
  const fetchResponse = await makeGDGOCAPIRequest<GDGOCIPB_WEB_API_RESPONSE<CheckedMemberData>>(apiUrl, {
    method: "POST",
    body,
  });

  if (fetchResponse?.success && fetchResponse.data) {
    const data = Array.isArray(fetchResponse.data)
      ? fetchResponse.data
      : [fetchResponse.data];
    return data.map(formatMember);
  } else {
    return ["User with similar data already exist. Please contact admin at @gdgoc.ipb"];
  }
}