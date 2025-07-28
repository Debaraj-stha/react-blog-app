type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

type ApiOptions= {
  method?: Method;
  url: string;
  data?: any;
  headers?: HeadersInit;
}

const apiHelper = async ({ method = 'GET', url, data, headers = {} }: ApiOptions) => {
  try {
    const isFormData = data instanceof FormData;
    const response = await fetch(url, {
      method,
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...headers,
      },
      body: isFormData ? data : JSON.stringify(data),
    });

    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");
    const result = isJson ? await response.json() : await response.text();
    if (!response.ok) {
      throw new Error(result?.message || "API Error");
    }
    return result;
  } catch (error: any) {
    console.error("API Error:", error.message || error);
    throw error;
  }
};


export default apiHelper;
