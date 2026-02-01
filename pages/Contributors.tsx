import React from 'react';
import { Users, Award, Globe, CheckCircle2, DollarSign, Smartphone } from 'lucide-react';
import { PublicLayout, PublicPageType } from '../components/PublicLayout';
import { Button } from '../components/Button';

interface PageProps {
  onNavigate: (page: PublicPageType) => void;
  onEnterApp: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export const Contributors: React.FC<PageProps> = ({ onNavigate, onEnterApp, isDark, toggleTheme }) => {
  return (
    <PublicLayout currentPage="contributors" onNavigate={onNavigate} onEnterApp={onEnterApp} isDark={isDark} toggleTheme={toggleTheme}>
      <section className="py-24 px-6 bg-zinc-900 text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>
         
         <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
            <span className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-4 block">Work on Your Terms</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Earn Money in Your Spare Time</h1>
            <p className="text-zinc-400 text-xl max-w-2xl mx-auto">
               Record audio, check images, or answer questions. Simple tasks, instant payments. No experience needed.
            </p>
            <div className="mt-10">
               <Button onClick={onEnterApp} size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-black border-none font-bold px-10 h-14 text-lg">
                 Start Earning Now
               </Button>
            </div>
         </div>

         <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 relative z-10 mb-20">
            <div className="bg-white/5 p-10 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
               <Smartphone className="h-10 w-10 text-emerald-400 mb-6" />
               <h3 className="font-bold text-2xl mb-4">Anywhere, Anytime</h3>
               <p className="text-base text-zinc-400 leading-relaxed">
                  Waiting for the bus? Relaxing at home? Login from your phone or laptop and finish a few tasks in minutes.
               </p>
            </div>
            <div className="bg-white/5 p-10 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
               <DollarSign className="h-10 w-10 text-blue-400 mb-6" />
               <h3 className="font-bold text-2xl mb-4">Clear Pay Rates</h3>
               <p className="text-base text-zinc-400 leading-relaxed">
                  See exactly how much a task pays before you start. No hidden fees, no guessing games.
               </p>
            </div>
            <div className="bg-white/5 p-10 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
               <Globe className="h-10 w-10 text-purple-400 mb-6" />
               <h3 className="font-bold text-2xl mb-4">Everyone Welcome</h3>
               <p className="text-base text-zinc-400 leading-relaxed">
                  We need contributors from all backgrounds and languages. Your unique perspective is what makes AI better.
               </p>
            </div>
         </div>

         <div className="max-w-4xl mx-auto bg-white/5 rounded-3xl p-12 border border-white/10 relative z-10">
            <h2 className="text-3xl font-bold mb-8 text-center">It's This Simple</h2>
            <div className="space-y-6">
               {[
                  { title: "1. Create Account", desc: "Sign up in 30 seconds. It's free." },
                  { title: "2. Pick a Task", desc: "Choose from Audio, Image, or Text tasks." },
                  { title: "3. Do the Work", desc: "Follow simple instructions (e.g., 'Read this sentence')." },
                  { title: "4. Get Paid", desc: "Money goes to your wallet instantly after approval." }
               ].map((step) => (
                  <div key={step.title} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                     <CheckCircle2 className="h-8 w-8 text-emerald-500 flex-shrink-0" />
                     <div>
                        <h4 className="font-bold text-xl text-white">{step.title}</h4>
                        <p className="text-zinc-400 text-lg">{step.desc}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
    </PublicLayout>
  );
};