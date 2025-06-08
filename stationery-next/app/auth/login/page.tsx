import { LoginForm } from "@/components/forms/LoginForm";

export default function Login() {
  return (
    <div className="md:mt-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
        Welcome back
      </h1>
      <p className="mt-4 text-base text-gray-700">
        Please enter your details to log into your account.
      </p>
      <main className="my-5">
        <LoginForm />
      </main>
    </div>
  );
}