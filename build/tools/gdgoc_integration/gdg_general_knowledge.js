import GDGDATA from "../../data/gdg.js";
export let gdg_general_knowledge_tool = [
    {
        name: "get-gdg-general-info",
        description: `Get Google Developer Group General Information. Variabel Data ${GDGDATA.map(item => item.name).join(',')}`,
        inputSchema: {
            type: "object",
            properties: {
                varName: { type: "string", description: "Exact Available Variable Name" },
            },
            required: ["varName"],
        },
    },
];
export let get_gdg_general_info = async (varName) => {
    let data = GDGDATA.find(item => item.name == varName);
    if (data) {
        return {
            content: [
                {
                    type: "text",
                    text: data.data,
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
                    text: `No information found for GDG: ${varName}. Available variable names are: ${GDGDATA.map(item => item.name).join(', ')}`,
                },
            ],
            isError: true,
        };
    }
};
