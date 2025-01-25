"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BrainCircuit,
  Code2,
  Coffee,
  Database,
  FileCode2,
  Github,
  Globe,
  Laptop,
  Linkedin,
  MapPin,
  MonitorSmartphone,
  Server,
  Terminal,
  Volume1,
  ListTodo,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-primary px-3 py-1 rounded-full bg-primary/10 mb-6">
                <Code2 className="h-4 w-4" aria-hidden="true" />
                <span className="text-sm font-medium">Software Developer</span>
              </div>
              <h1 className="text-4xl font-bold mb-4 tracking-tight">
                Wellington Reis
              </h1>
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="w-4 h-4 mr-2" aria-hidden="true" />
                <span>Brazil</span>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Passionate software developer with 5+ years of experience
                crafting robust and scalable applications. Specializing in
                backend development with expertise in modern technologies and
                distributed systems.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/blog">
                    <FileCode2 className="w-4 h-4 mr-2" />
                    Read My Blog
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/tasks">
                    <ListTodo className="w-4 h-4 mr-2" />
                    View Tasks
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-4 bg-card/50 backdrop-blur-sm">
                  <BrainCircuit className="w-6 h-6 mb-3 text-primary" />
                  <h3 className="font-semibold mb-1">Problem Solver</h3>
                  <p className="text-sm text-muted-foreground">
                    Analytical thinker with a passion for elegant solutions
                  </p>
                </Card>
                <Card className="p-4 bg-card/50 backdrop-blur-sm">
                  <Terminal className="w-6 h-6 mb-3 text-primary" />
                  <h3 className="font-semibold mb-1">Clean Code</h3>
                  <p className="text-sm text-muted-foreground">
                    Advocate for maintainable and efficient code
                  </p>
                </Card>
                <Card className="p-4 bg-card/50 backdrop-blur-sm">
                  <Server className="w-6 h-6 mb-3 text-primary" />
                  <h3 className="font-semibold mb-1">Scalable Systems</h3>
                  <p className="text-sm text-muted-foreground">
                    Building high-performance distributed applications
                  </p>
                </Card>
                <Card className="p-4 bg-card/50 backdrop-blur-sm">
                  <Database className="w-6 h-6 mb-3 text-primary" />
                  <h3 className="font-semibold mb-1">Database Expert</h3>
                  <p className="text-sm text-muted-foreground">
                    Designing efficient data structures and queries
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Technical Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Frontend Development</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">React & Next.js</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">Vue.js & Nuxt.js</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">TypeScript</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">Tailwind CSS</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Database className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Backend Development</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">Node.js & Express</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">Python</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">C# & .NET</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">Java</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Laptop className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Other Skills</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">DevOps & CI/CD</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">
                    System Architecture
                  </span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">
                    SQL & NoSQL Databases
                  </span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">Microservices</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Personal Section */}
      <section className="py-16 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">What I Love</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Code2
                  className="w-6 h-6 text-primary shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-medium text-sm">Coding</h3>
                  <p className="text-xs text-muted-foreground">
                    Passionate about creating elegant solutions
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <MonitorSmartphone
                  className="w-6 h-6 text-primary shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-medium text-sm">Technology</h3>
                  <p className="text-xs text-muted-foreground">
                    Always learning new technologies
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Coffee
                  className="w-6 h-6 text-primary shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-medium text-sm">Coffee</h3>
                  <p className="text-xs text-muted-foreground">
                    Coffee enthusiast and explorer
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Volume1
                  className="w-6 h-6 text-primary shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-medium text-sm">Focus</h3>
                  <p className="text-xs text-muted-foreground">
                    Deep work in quiet spaces
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
