import Image from "next/image";
import Layout from "@components/layout/Layout";
export const metadata = {
  title: 'Home',
  description: 'Login or sign up to access the Restaurant app.',
};

export default function Home() {
  return (
    <Layout>
      <h1>food delivery app</h1>
    </Layout>
  );
}
