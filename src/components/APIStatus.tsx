import { useQuery } from "@tanstack/react-query";

export default function APIStatus() {
  const { data, status } = useQuery({
    queryKey: ["apiStatus"],
    queryFn: async () => {
      const uri = "http://localhost:9001/health";
      const response = await fetch(uri);
      return await response.json();
    },
  });

  return (
    <div style={{ marginBottom: "3rem" }}>
      {status === "success" && data?.status === "ok" && (
        <p style={{ color: "green", fontWeight: 600 }}>API OK</p>
      )}
      {status === "error" && (
        <p style={{ color: "red", fontWeight: 600 }}>Unable to connect</p>
      )}
      {status === "pending" && (
        <p style={{ color: "gray", fontWeight: 600}}>Connecting...</p>
      )}
    </div>
  );
}