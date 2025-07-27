#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
  CallToolResult,
  TextContent,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import GDGDATA from "./data/gdg.js";
import { gdg_general_knowledge_tool} from "./tools/gdgoc_integration/gdg_general_knowledge.js";
import GDGOCDATA from "./data/gdgoc.js";
import { gdgoc_general_knowledge_tool } from "./tools/gdgoc_integration/gdgoc_general_knowledge.js";
import { gdgoc_ipb_event_informations_tool } from "./tools/gdgoc_integration/gdgoc_ipb_event_informations.js";
import { gdgoc_ipb_community_service_tool } from "./tools/gdgoc_integration/gdgoc_ipb_community_service.js";
import { handleToolCall } from "./tools/tool_call.js";
import { ipb_integration_rag_tool } from "./tools/ipb_integration/ipb_rag_integration.js";

// Initiate MCP Server
const server = new Server(
  {
    name: "ipb-community-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  },
);

// Combining Tools
const COMBINEDTOOLS: Tool[] = [
  ...gdg_general_knowledge_tool,
  ...gdgoc_general_knowledge_tool,
  ...gdgoc_ipb_event_informations_tool,
  ...gdgoc_ipb_community_service_tool,
  ...ipb_integration_rag_tool
]

// Simple in-memory storage for GDG data as resources
const allResources = new Map<string, { name: string; mimeType: string; data: string }>();

// Add resources from GDGDATA
for (const key in GDGDATA) {
  allResources.set(`gdg://${key}`, { name: `GDG Data: ${key}`, mimeType: "application/json", data: JSON.stringify(GDGDATA[key], null, 2) });
}

// Add resources from GDGOCDATA
for (const key in GDGOCDATA) {
  allResources.set(`gdgoc://${key}`, { name: `GDGOC Data: ${key}`, mimeType: "application/json", data: JSON.stringify(GDGOCDATA[key], null, 2) });
}

// IMPORTING TOOL CALL
// FROM tool_call.ts

// Load Tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: COMBINEDTOOLS,
}));

// Load Tools Execution Function
server.setRequestHandler(CallToolRequestSchema, async (request) =>
  handleToolCall(request.params.name, request.params.arguments ?? {})
);

// List Available Resources
server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: Array.from(allResources.values()).map(resource => ({
    uri: Array.from(allResources.keys()).find(key => allResources.get(key) === resource)!,
    mimeType: resource.mimeType,
    name: resource.name,
  })),
}));

// Read the Content of a Specific Resource
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri.toString();
  const resource = allResources.get(uri);

  if (resource) {
    return {
      contents: [{
        uri,
        mimeType: resource.mimeType,
        text: resource.data,
      }],
    };
  }

  throw new Error(`Resource not found: ${uri}`);
});


// Run Server
async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch(console.error);

process.stdin.on("close", () => {
  console.error("GDG Community MCP Server closed");
  server.close();
});