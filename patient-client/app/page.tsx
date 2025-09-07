import { redirect } from 'next/navigation';

export default function Page() {
  // When someone visits "/", send them to /language
  redirect('/home');
}