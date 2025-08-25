export function getApiBaseUrl(): string {
	const ls = typeof window !== 'undefined' ? window.localStorage.getItem('API_BASE_URL') : null
	return ls || import.meta.env.VITE_API_URL || "http://localhost:8000"
}

export async function getHealth(): Promise<{ status: string }>{
	const res = await fetch(`${getApiBaseUrl()}/health`);
	if (!res.ok) throw new Error(`Health check failed: ${res.status}`);
	return res.json();
}


