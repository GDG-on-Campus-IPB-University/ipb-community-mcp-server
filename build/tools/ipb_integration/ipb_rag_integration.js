import { getFromCollection } from "../../utils/retrieval/semantic-search.js";
export let ipb_integration_rag_tool = [
    {
        name: "get-ipb-integration-rag",
        description: `Get Information About IPB from IPB Official Documents using Retrieval Augmented Generation (RAG).`,
        inputSchema: {
            type: "object",
            properties: {
                query: { type: "string", description: "Query Question to get Retrieval Augmented Generation (RAG)" },
            },
            required: ["query"],
        },
    },
];
export let ipb_integration_rag = async (query) => {
    const queryText = { text: query };
    const formattedResults = await fetchAndFormatData(queryText);
    if (formattedResults) {
        return {
            content: [
                {
                    type: "text",
                    text: formattedResults,
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
                    text: `No information from IPB Document found for the question in this Vector Database.`,
                },
            ],
            isError: true,
        };
    }
};
function formatData(data) {
    return [
        `Respond Method:`,
        `only using this data!! to answer the question and only using this data you must also create the citation on from what documentName, from WhatLine to WhatLine and what page number`,
        ``,
        ``,
        `Data:`,
        `${JSON.stringify(data)}`,
    ].join("\n");
}
async function fetchAndFormatData(queryText) {
    const vectorStoreRelativePath = '/vectorstore';
    try {
        const fetchResponse = await getFromCollection(vectorStoreRelativePath, queryText);
        if (fetchResponse) {
            return formatData(fetchResponse);
        }
        else {
            return "RAG Tidak terexecute";
            console.error("Failed to fetch and format member data.");
            return null;
        }
    }
    catch (error) {
        return "RAG ERROR " + error;
    }
}
