"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { AuthDialog } from "@/components/auth-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function NewPost() {
  const router = useRouter();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.email === "test@test.com") return;

    setLoading(true);

    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          title,
          content,
          user_id: user.id,
        },
      ])
      .select();

    setLoading(false);

    if (error) {
      console.error("Error creating post:", error);
      return;
    }

    router.push("/blog");
  };

  if (!user || user.email === "test@test.com") {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            You don't have permission to create new blog posts
          </p>
          <Button onClick={() => router.push("/blog")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Button
        variant="ghost"
        className="mb-8"
        onClick={() => router.push("/blog")}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Blog
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card className="p-6">
            <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content (Markdown)</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your post content in Markdown..."
                  className="min-h-[500px] font-mono"
                  required
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={loading}>
                  {loading ? "Publishing..." : "Publish Post"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
        <div className="relative">
          <div className="sticky top-8">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              <div className="prose dark:prose-invert max-w-none">
                <h1>{title || "Post Title"}</h1>
                <div className="markdown-content">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ className, children }) {
                        const match = /language-(\w+)/.exec(className || "");
                        const isInline = !match;
                        return !isInline ? (
                          <SyntaxHighlighter
                            style={oneDark}
                            language={match![1]}
                            PreTag="div"
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className}>{children}</code>
                        );
                      },
                      p: ({ children }) => (
                        <p style={{ whiteSpace: "pre-wrap" }}>{children}</p>
                      ),
                      ul: ({ children }) => (
                        <ul className="my-6">{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="my-6">{children}</ol>
                      ),
                      h1: ({ children }) => (
                        <h1 className="mt-8 mb-4">{children}</h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="mt-8 mb-4">{children}</h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="mt-6 mb-4">{children}</h3>
                      ),
                      h4: ({ children }) => (
                        <h4 className="mt-6 mb-4">{children}</h4>
                      ),
                      h5: ({ children }) => (
                        <h5 className="mt-6 mb-4">{children}</h5>
                      ),
                      h6: ({ children }) => (
                        <h6 className="mt-6 mb-4">{children}</h6>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="my-6 border-l-4 border-primary/20 pl-6 italic">
                          {children}
                        </blockquote>
                      ),
                    }}
                  >
                    {content || "_Start writing to see the preview..._"}
                  </ReactMarkdown>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
