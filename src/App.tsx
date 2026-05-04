/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring, useTransform, useMotionValue, useInView } from 'motion/react';
import { 
  ArrowRight, 
  Mail, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Github, 
  ExternalLink, 
  Award, 
  TrendingUp, 
  Users, 
  Camera, 
  Compass,
  Menu,
  X
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { portfolioData } from './data/portfolioData';
import { FadeIn, Card, Badge, Section, TextReveal, MagneticButton, Counter } from './components/ui/Layout';

// Custom Cursor Component
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[100] mix-blend-difference hidden md:block"
      animate={{
        x: position.x - 16,
        y: position.y - 16,
        scale: isPointer ? 2.5 : 1,
      }}
      transition={{ type: 'spring', stiffness: 250, damping: 25, mass: 0.5 }}
    >
      <div className="w-full h-full bg-white rounded-full opacity-60 blur-[2px]" />
    </motion.div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Advisory', href: '#advisory' },
    { name: 'Interests', href: '#interests' }
  ];

  return (
    <div className="min-h-screen selection:bg-white/20 overflow-x-hidden" onPointerMove={handlePointerMove}>
      <CustomCursor />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${scrolled ? 'glass-nav py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex justify-between items-center">
          <motion.a 
            href="#" 
            className="text-lg font-bold tracking-tighter"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            ALAN CHUNG
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-10 items-center">
            {navLinks.map((link, i) => (
              <motion.a 
                key={link.name} 
                href={link.href} 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-xs font-bold uppercase tracking-widest text-[#A1A1AA] hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
            <MagneticButton>
              <a 
                href="#contact" 
                className="px-6 py-2.5 bg-white text-black rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-all block"
              >
                Contact
              </a>
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 w-full bg-[#0B0B0C] border-b border-white/5 p-8 flex flex-col gap-6 shadow-2xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-2xl font-bold tracking-tight text-white hover:text-gray-400"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 md:pt-64 md:pb-48 px-6 md:px-12 overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />
        
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-24">
          <div className="flex-[1.4] space-y-10">
            <FadeIn direction="up">
              <Badge>Building the future</Badge>
              <div className="mt-8">
                <TextReveal 
                  text="Alan Chung" 
                  className="text-6xl md:text-[96px] font-semibold tracking-tighter leading-[1]" 
                />
              </div>
              <p className="text-xl md:text-2xl text-[#A1A1AA] max-w-xl mt-10 font-light leading-relaxed">
                {portfolioData.tagline}
              </p>
              <div className="flex flex-wrap gap-5 pt-6">
                <MagneticButton attachToRef={false}>
                  <a 
                    href="#experience" 
                    className="px-10 py-5 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2 group hover:gap-3 transition-all"
                  >
                    Experience <ArrowRight size={16} />
                  </a>
                </MagneticButton>
                <MagneticButton attachToRef={false}>
                  <a 
                    href="#contact" 
                    className="px-10 py-5 bg-[#0B0B0C] border border-white/20 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-all outline-none"
                  >
                    Contact
                  </a>
                </MagneticButton>
              </div>
            </FadeIn>
          </div>
          
          <FadeIn direction="up" delay={0.4} className="flex-1 w-full max-w-sm md:max-w-none">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.05)] group">
              <motion.img 
                src="/alan_chung.jpg" 
                alt="Alan Chung Profile" 
                className="w-full h-full object-cover grayscale opacity-90 transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 ring-1 ring-white/10 rounded-3xl pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* About Section */}
      <Section id="about" title="Entrepreneurial Journey" subtitle="About" className="">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-20 items-start">
          <FadeIn>
            <p className="text-3xl md:text-4xl text-white font-medium leading-tight">
              {portfolioData.about.content}
            </p>
          </FadeIn>
          <div className="space-y-8 text-[#A1A1AA] leading-relaxed text-lg font-light">
            {portfolioData.about.story.map((para, i) => (
              <FadeIn key={i} delay={0.2 * (i + 1)}>
                <p>{para}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      {/* Experience Timeline */}
      <Section id="experience" title="Career Timeline" subtitle="Experience">
        <div className="grid grid-cols-1 gap-6 relative">
          <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 lg:-translate-x-1/2 ml-4 lg:ml-0" />
          
          {portfolioData.experience.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}
        </div>
      </Section>

      {/* Achievements Section */}
      <Section id="achievements" title="Selected Milestones" subtitle="Recognition">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioData.achievements.map((achievement, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <Card className="h-full group hover:bg-white/10">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-8 text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Award size={24} />
                </div>
                <h3 className="text-lg font-bold mb-4 tracking-tight uppercase px-1">{achievement.title}</h3>
                <p className="text-[#A1A1AA] text-sm leading-relaxed font-light">{achievement.description}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Advisory & Investing */}
      <Section id="advisory" title="Investment & Partner" subtitle="Ventures" className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <FadeIn>
              <h3 className="text-3xl font-medium mb-10 leading-tight">Backing the next generation of builders.</h3>
              <p className="text-[#A1A1AA] text-lg leading-relaxed mb-12 font-light">
                As a Venture Partner at ERA and an angel investor for over 20 years, I focus on supporting early-stage technical founders through mentorship, product strategy, and architectural guidance.
              </p>
              <div className="space-y-8">
                <FadeIn delay={0.3} direction="none">
                  <div className="flex items-start gap-6 group">
                    <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-colors group-hover:scale-110 duration-500"><TrendingUp size={22} /></div>
                    <div>
                      <h4 className="font-bold text-white uppercase text-xs tracking-widest mb-2">Trend Analysis</h4>
                      <p className="text-sm text-[#A1A1AA] font-light">Identifying foundational shifts in software and consumer technology.</p>
                    </div>
                  </div>
                </FadeIn>
                <FadeIn delay={0.4} direction="none">
                  <div className="flex items-start gap-6 group">
                    <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-colors group-hover:scale-110 duration-500"><Users size={22} /></div>
                    <div>
                      <h4 className="font-bold text-white uppercase text-xs tracking-widest mb-2">Founder Mentorship</h4>
                      <p className="text-sm text-[#A1A1AA] font-light">Sharing lessons from multiple successful exits and scale events.</p>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </FadeIn>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            <FadeIn delay={0.2} direction="right">
              <div className="glass-card p-12 relative overflow-hidden group hover:bg-white/10 transition-colors">
                <div className="absolute top-0 right-0 p-8 text-white/5 transform group-hover:scale-110 transition-transform duration-700">
                  <ArrowRight size={120} />
                </div>
                <h4 className="text-6xl md:text-8xl font-bold mb-4 tracking-tighter">ERA</h4>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#A1A1AA]">Partner @ ER Accelerator</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.4} direction="right">
              <div className="glass-card p-12 relative overflow-hidden group hover:bg-white/10 transition-colors">
                 <div className="absolute top-0 right-0 p-8 text-white/5 transform group-hover:scale-110 transition-transform duration-700">
                  <ArrowRight size={120} />
                </div>
                <h4 className="text-6xl md:text-8xl font-bold mb-4 tracking-tighter">
                  <Counter value="20+" />
                </h4>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#A1A1AA]">Years of Angel Investing</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Skills */}
      <Section title="Competencies" subtitle="Expertise">
        <div className="flex flex-wrap gap-4 justify-center">
          {portfolioData.expertise.map((skill, i) => (
            <FadeIn key={i} delay={i * 0.05} direction="up">
              <motion.div 
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,1)', color: 'rgba(0,0,0,1)' }}
                className="px-10 py-6 glass-card rounded-full text-base font-bold uppercase tracking-widest cursor-default text-xs"
              >
                {skill}
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Interests */}
      <Section id="interests" title="Perspectives" subtitle="Interests">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioData.interests.map((interest, i) => (
            <FadeIn key={i} delay={i * 0.2}>
              <div className="group overflow-hidden rounded-3xl bg-[#111111] relative aspect-[16/10]">
                <img 
                  src={interest.imageUrl} 
                  alt={interest.title}
                  className="w-full h-full object-cover grayscale opacity-50 transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-12 left-12 transform group-hover:-translate-y-4 transition-transform duration-500">
                  <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 text-[#A1A1AA]">
                    {interest.title === 'Photography' ? <Camera size={14} /> : <Compass size={14} />} {interest.title}
                  </span>
                  <h3 className="text-3xl font-bold tracking-tight">{interest.title}</h3>
                  <p className="mt-4 max-w-sm text-[#A1A1AA] text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 font-light">
                    {interest.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" title="Let's build." subtitle="Contact" className="mb-48 text-center max-w-3xl">
        <FadeIn>
          <p className="text-2xl text-[#A1A1AA] leading-relaxed mb-20 font-light">
            I'm always looking for ambitious projects and founders. 
            If you're building something significant, let's talk.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <MagneticButton className="w-full">
              <a href={`mailto:${portfolioData.contact.email}`} className="glass-card p-10 hover:bg-white hover:text-black transition-all group block">
                <Mail size={32} className="mx-auto mb-6 opacity-50 group-hover:opacity-100" />
                <span className="block text-[10px] font-bold uppercase tracking-widest text-[#A1A1AA] group-hover:text-black/50 mb-2">Direct Channel</span>
                <span className="text-xl font-bold">{portfolioData.contact.email}</span>
              </a>
            </MagneticButton>
            <div className="glass-card p-10">
              <MapPin size={32} className="mx-auto mb-6 opacity-50" />
              <span className="block text-[10px] font-bold uppercase tracking-widest text-[#A1A1AA] mb-2">Based In</span>
              <span className="text-xl font-bold">{portfolioData.contact.location}</span>
            </div>
          </div>

          <div className="flex justify-center gap-12 mt-24">
            {portfolioData.contact.socials.map((social, i) => {
              const Icon = social.platform === 'LinkedIn' ? Linkedin : 
                           social.platform === 'Twitter' ? Twitter : Github;
              return (
                <motion.a 
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="text-[#A1A1AA] hover:text-white transition-all hover:scale-125"
                >
                  <Icon size={28} />
                </motion.a>
              );
            })}
          </div>
        </FadeIn>
      </Section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-gray-500 text-sm font-light">
          © {new Date().getFullYear()} Alan Chung. All rights reserved.
        </p>
        <div className="flex gap-8 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors flex items-center gap-1">Colophon <ExternalLink size={10} /></a>
        </div>
      </footer>
    </div>
  );
}

function ExperienceCard({ exp, index }: { exp: typeof portfolioData.experience[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px 0px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.05 }}
      style={{ opacity: isInView ? 1 : 0.4, scale: isInView ? 1 : 0.98 }}
      className={`glass-card p-10 flex flex-col md:flex-row gap-8 items-start group transition-all duration-700 relative z-10 ${isInView ? 'ring-1 ring-white/20' : ''}`}
    >
      <div className="md:w-32 pt-1 font-mono text-xs uppercase tracking-widest text-[#A1A1AA] font-bold">
        {exp.duration}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold text-white group-hover:text-white transition-colors">{exp.role}</h3>
            <p className="text-lg font-medium text-white/50 mt-1 uppercase tracking-[0.15em] text-[10px] font-bold">{exp.company}</p>
          </div>
          <span className="hidden md:flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#A1A1AA] opacity-50"><MapPin size={12} /> {exp.location}</span>
        </div>
        <p className="mt-8 text-[#A1A1AA] leading-relaxed max-w-3xl font-light text-lg">
          {exp.description}
        </p>
      </div>
    </motion.div>
  );
}
