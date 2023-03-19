import Head from "next/head";
import dynamic from "next/dynamic";
import { useContext } from "react";
import { contextProvider } from "../../context/AuthContext";
import { useRouter } from "next/router";

var Editor = dynamic((e) => import("../../components/Editor/Editor"), {
  ssr: false,
});

export default function Home() {
    // USer and db user
    const { user,dbUser } = useContext(contextProvider);
    const router = useRouter()
    if(user===null){
       router.push('/login')
    }
  return (
    <div>
      <main>
        <Editor user={user} dbUser={dbUser} />
      </main>
    </div>
  );
}
