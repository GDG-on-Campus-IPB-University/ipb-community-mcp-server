import GDGOCDATA from "../../data/gdgoc.js";
export let gdgoc_general_knowledge_tool = [
    {
        name: "get-gdgoc-general-info",
        description: `Get Google Developer Group on Campus General Information. Variabel Data ${GDGOCDATA.map(item => item.name).join(',')}`,
        inputSchema: {
            type: "object",
            properties: {
                varName: { type: "string", description: "Exact Available Variable Name" },
            },
            required: ["varName"],
        },
    },
];
export let get_gdgoc_general_info = async (varName) => {
    let data = GDGOCDATA.find(item => item.name == varName);
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
                    text: `No information found for GDGOC: ${varName}. Available variable names are: ${GDGOCDATA.map(item => item.name).join(', ')}`,
                },
            ],
            isError: true,
        };
    }
};
