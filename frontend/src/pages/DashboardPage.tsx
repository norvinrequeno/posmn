import useAuth from "../auth/useAuth";

export default function DashboardPage() {
  const { name } = useAuth();
  return (
    <>
      Hola <strong>{name}</strong>
    </>
  );
}
