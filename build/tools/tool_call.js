import { get_gdg_general_info } from "./gdgoc_integration/gdg_general_knowledge.js";
import { get_gdgoc_general_info } from "./gdgoc_integration/gdgoc_general_knowledge.js";
import { gdgoc_ipb_event_informations } from "./gdgoc_integration/gdgoc_ipb_event_informations.js";
import { gdgoc_ipb_community_service_add_member, gdgoc_ipb_community_service_check_member } from "./gdgoc_integration/gdgoc_ipb_community_service.js";
import { ipb_integration_rag } from "./ipb_integration/ipb_rag_integration.js";
// Handle tool calling
export async function handleToolCall(name, args) {
    switch (name) {
        case "get-gdg-general-info":
            try {
                let data = await get_gdg_general_info(args.varName);
                return {
                    content: [{
                            type: "text",
                            text: JSON.stringify(data, null, 2),
                        }],
                    isError: false,
                };
            }
            catch (error) {
                return {
                    content: [{
                            type: "text",
                            text: `Error Requesting Data`,
                        }],
                    isError: true,
                };
            }
        case "get-gdgoc-general-info":
            try {
                let data = await get_gdgoc_general_info(args.varName);
                return {
                    content: [{
                            type: "text",
                            text: JSON.stringify(data, null, 2),
                        }],
                    isError: false,
                };
            }
            catch (error) {
                return {
                    content: [{
                            type: "text",
                            text: `Error Requesting Data`,
                        }],
                    isError: true,
                };
            }
        case "get-gdgoc-ipb-event-info":
            try {
                let data = await gdgoc_ipb_event_informations();
                return {
                    content: [{
                            type: "text",
                            text: JSON.stringify(data, null, 2),
                        }],
                    isError: false,
                };
            }
            catch (error) {
                return {
                    content: [{
                            type: "text",
                            text: `Error Requesting Data`,
                        }],
                    isError: true,
                };
            }
        case "get-gdgoc-ipb-community-check-member":
            try {
                let data = await gdgoc_ipb_community_service_check_member(args.instagram, args.nama_lengkap, args.asal_universitas, args.fakultas, args.email);
                return {
                    content: [{
                            type: "text",
                            text: JSON.stringify(data, null, 2),
                        }],
                    isError: false,
                };
            }
            catch (error) {
                return {
                    content: [{
                            type: "text",
                            text: `Error Requesting Data ${error}`,
                        }],
                    isError: true,
                };
            }
        case "get-gdgoc-ipb-community-add-member":
            try {
                let data = await gdgoc_ipb_community_service_add_member(args.instagram, args.linkedin, args.nama_lengkap, args.gdg_profile, args.student_number, args.asal_universitas, args.fakultas, args.program_studi_departemen, args.tahun_angkatan, args.gdg_join, args.other_community, args.motivasi, args.harapan, args.kontribusi, args.toc, args.email);
                return {
                    content: [{
                            type: "text",
                            text: JSON.stringify(data, null, 2),
                        }],
                    isError: false,
                };
            }
            catch (error) {
                return {
                    content: [{
                            type: "text",
                            text: `Error Requesting Data ${error}`,
                        }],
                    isError: true,
                };
            }
        case "get-ipb-integration-rag":
            try {
                let data = await ipb_integration_rag(args.query);
                return {
                    content: [{
                            type: "text",
                            text: JSON.stringify(data, null, 2),
                        }],
                    isError: false,
                };
            }
            catch (error) {
                return {
                    content: [{
                            type: "text",
                            text: `Error Requesting Data ${error}`,
                        }],
                    isError: true,
                };
            }
        default:
            return {
                content: [{
                        type: "text",
                        text: `Unknown tool: ${name}`,
                    }],
                isError: true,
            };
    }
}
