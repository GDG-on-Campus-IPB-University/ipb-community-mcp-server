import { makeSimpleGETFetchRequest } from "../../utils/apirequest.js";
export let gdgoc_ipb_event_informations_tool = [
    {
        name: "get-gdgoc-ipb-event-info",
        description: `Get Google Developer Group on Campus IPB ALL Event Information. So you need to handle yourself, if using ask for ongoing, recent, past or future event.`,
        inputSchema: {
            type: "object",
            properties: {},
            required: [],
        },
    },
];
export let gdgoc_ipb_event_informations = async () => {
    let APIUrl = "https://gdg.community.dev/api/event_slim/for_chapter/2954/?status=Completed&include_cohosted_events=true&visible_on_parent_chapter_only=true&order=-start_date&fields=title,start_date,event_type_title,cropped_picture_url,cropped_banner_url,url,cohost_registration_url,description,description_short";
    let formattedEvents = await fetchAndFormatEvents(APIUrl);
    if (formattedEvents && formattedEvents.length > 0) {
        return {
            content: [
                {
                    type: "text",
                    text: formattedEvents.join("\n\n"),
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
                    text: `No event information found for GDGOC IPB`,
                },
            ],
            isError: true,
        };
    }
};
function formatEvent(event) {
    return [
        `Event: ${event.title || "Unknown"}`,
        `Type: ${event.event_type_title || "Unknown"}`,
        `Starts On: ${event.start_date || "Unknown"}`,
        `Description: ${event.description_short || "No short description"}`,
        `URL: ${event.url || "No URL"}`,
        "---",
    ].join("\n");
}
async function fetchAndFormatEvents(apiUrl) {
    const eventResponse = await makeSimpleGETFetchRequest(apiUrl);
    if (eventResponse) {
        return eventResponse.results.map(formatEvent);
    }
    else {
        console.error("Failed to fetch and format event data.");
        return null;
    }
}
