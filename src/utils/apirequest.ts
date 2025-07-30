const mainURL = "https://gdgipb.site/"

export interface GDGOCIPB_WEB_API_RESPONSE<T = any> {
    success: boolean;
    message: string;
    data?: T[];      
    error?: string; 
}

export async function makeGDGOCAPIRequest<T>(
  url: string,
  options?: {
    method?: "GET" | "POST";
    body?: any;
  }
): Promise<T | null> {
  const { method = "GET", body } = options || {};
  let token: string | null = null;

  try {
    const tokenResponse = await fetch(`${mainURL}/api/generate-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: url }), 
    });

    if (!tokenResponse.ok) {
      throw new Error(`Failed to fetch token: ${tokenResponse.statusText}`);
    }
    const tokenData = await tokenResponse.json();
    token = tokenData.token;

    if (!token) {
        throw new Error('Token was not found in the response.');
    }

  } catch (error) {
    console.error("Error fetching authentication token:", error);
    return null; 
  }

  const headers: Record<string, string> = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  try {
    const response = await fetch(`${mainURL}/api/protected/${url}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API request failed: ${response.statusText} - ${errorData.error || ''}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("Error making API request:", error);
    return null;
  }
}

export async function makeSimpleGETFetchRequest<T>(url: string)
{
  try {
      const response = await fetch(url);

      if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
      }

      return await response.json();

  } catch (error) {
      console.error("Error fetching data:", error);
      return null; 
  }
}

export function formatInterface<T extends Record<string, any>>(data: T): string {
    return Object.entries(data)
      .map(([key, value]) => {
        const label = key
          .replace(/_/g, ' ')
          .replace(/\b\w/g, c => c.toUpperCase()); 
  
        const formatted =
          value instanceof Date ? value.toLocaleString() : value || "Unknown";
  
        return `${label}: ${formatted}`;
      })
      .join("\n");
}