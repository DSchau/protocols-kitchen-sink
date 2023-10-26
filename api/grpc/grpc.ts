export function grpc() {
  const status = 501;

  return new Response(`${status}: Not Implemented`, {
    status,
  });
}
