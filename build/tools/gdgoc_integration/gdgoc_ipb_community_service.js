import { makeGDGOCAPIRequest } from "../../utils/apirequest.js";
export let gdgoc_ipb_community_service_tool = [
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
        description: `Get Google Developer Group on Campus IPB Member Registration. | pastikan sudah bergabung menjadi registered member di GDGOC IPB di Google Community Platform`,
        inputSchema: {
            type: "object",
            properties: {
                instagram: { type: "string", description: "Instagram profile username (e.g. @gdgoc.ipb)" },
                linkedin: { type: "string", description: "Linked profile link (e.g. linkedin.com/xxxxx)" },
                nama_lengkap: { type: "string", description: "Nama Lengkap User" },
                gdg_profile: { type: "string", description: "Link to GDG profile (must start with https://gdg.community.dev/u/)" },
                student_number: { type: "string", description: "Nomor Induk Mahasiswa atau Student Number" },
                asal_universitas: { type: "string", description: "Asal Universitas User (Tidak boleh singkatan)" },
                fakultas: { type: "string", description: "Fakultas User" },
                program_studi_departemen: { type: "string", description: "Program Studi / Departemen User" },
                tahun_angkatan: { type: "string", description: "Tahun Angkatan (format: 4-digit year, e.g., 2025)" },
                gdg_join: { type: "boolean", description: "Apakah sudah bergabung dengan chapter GDG on Campus IPB University?" },
                other_community: { type: "string", description: "Komunitas lain yang pernah diikuti (optional)" },
                motivasi: { type: "string", description: "Motivasi untuk bergabung (10–255 karakter)" },
                harapan: { type: "string", description: "Harapan terhadap komunitas (10–255 karakter)" },
                kontribusi: { type: "string", description: "Kontribusi yang ingin diberikan (10–255 karakter)" },
                toc: { type: "boolean", description: "Persetujuan terhadap Terms and Conditions (harus true)" },
                email: { type: "string", description: "Email User" }
            },
            required: ["instagram", "linkedin", "nama_lengkap", "gdg_profile", "student_number", "asal_universitas", "fakultas",
                "program_studi_departemen", "tahun_angkatan", "gdg_join", "motivasi", "harapan", "kontribusi", "toc", "email"]
        },
    },
];
;
export let gdgoc_ipb_community_service_check_member = async (instagram, nama_lengkap, asal_universitas, fakultas, email) => {
    let APIUrl = "registration/check-member";
    let body = { instagram, nama_lengkap, asal_universitas, fakultas, email };
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
    }
    else {
        return {
            content: [
                {
                    type: "text",
                    text: `Error Occured. Tidak ada data member.  
          FAQ: Jika sudah daftar, coba cek email. Jika masih tidak ada, coba kontak admin.
          Additional Error Info:
          ${formattedMembers}`,
                },
            ],
            isError: true,
        };
    }
};
export let gdgoc_ipb_community_service_add_member = async (instagram, linkedin, nama_lengkap, gdg_profile, student_number, asal_universitas, fakultas, program_studi_departemen, tahun_angkatan, gdg_join, other_community, motivasi, harapan, kontribusi, toc, email) => {
    let APIUrl = "registration/add-member";
    let body = { instagram, linkedin, nama_lengkap, gdg_profile, student_number, asal_universitas, fakultas, program_studi_departemen, tahun_angkatan, gdg_join, other_community, motivasi, harapan, kontribusi, toc, email };
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
    }
    else {
        return {
            content: [
                {
                    type: "text",
                    text: `Error Occured.  
          FAQ: Jika sudah daftar, coba cek email. Jika masih tidak ada, coba kontak admin.
          Additional Error Info:
          ${formattedMembers}`,
                },
            ],
            isError: true,
        };
    }
};
function formatMember(member) {
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
        "REGISTRASI BERHASIL, CHECK EMAIL UNTUK MELIHAT LINK VERIFIKASI"
    ].join("\n");
}
async function fetchAndFormatMember(apiUrl, body) {
    const fetchResponse = await makeGDGOCAPIRequest(apiUrl, {
        method: "POST",
        body,
    });
    if (fetchResponse && fetchResponse.data) {
        return fetchResponse.data.map(formatMember);
    }
    else {
        return [`Error Occured.  
      FAQ: Jika sudah daftar, coba cek email. Jika masih tidak ada, coba kontak admin.
      `, `Additional Error Info: ${JSON.stringify(fetchResponse)}`];
    }
}
async function fetchAndFormatAddMember(apiUrl, body) {
    const fetchResponse = await makeGDGOCAPIRequest(apiUrl, {
        method: "POST",
        body,
    });
    if (fetchResponse?.error != null) {
        return [JSON.stringify(fetchResponse)];
    }
    if (fetchResponse?.success && fetchResponse.data) {
        const data = Array.isArray(fetchResponse.data)
            ? fetchResponse.data
            : [fetchResponse.data];
        return data.map(formatMember);
    }
    else {
        return [`Error Occured.  
    FAQ: Jika sudah daftar, coba cek email. Jika masih tidak ada, coba kontak admin.
    `, `Additional Error Info: ${JSON.stringify(fetchResponse)}`];
    }
}
