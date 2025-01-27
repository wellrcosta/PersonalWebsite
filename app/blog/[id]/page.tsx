"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
}

export default function BlogPost() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedPost, setEditedPost] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    fetchPost();
  }, [params.id]);

  async function fetchPost() {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) {
      console.error("Error fetching post:", error);
      return;
    }

    setPost(data);
    setEditedPost({
      title: data.title,
      content: data.content,
    });
    setLoading(false);
  }

  const handleEdit = async () => {
    if (!user || !post || user.email === "test@test.com") return;

    const { error } = await supabase
      .from("posts")
      .update({
        title: editedPost.title,
        content: editedPost.content,
      })
      .eq("id", post.id);

    if (error) {
      console.error("Error updating post:", error);
      return;
    }

    setIsEditDialogOpen(false);
    await fetchPost();
  };

  const canManagePosts = user && user.email !== "test@test.com";

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-secondary rounded w-3/4"></div>
          <div className="h-4 bg-secondary rounded w-1/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-secondary rounded"></div>
            <div className="h-4 bg-secondary rounded"></div>
            <div className="h-4 bg-secondary rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <p className="text-muted-foreground mb-6">
            The post you're looking for doesn't exist or has been removed.
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
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <Button variant="ghost" onClick={() => router.push("/blog")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>
        {canManagePosts && (
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Pencil className="w-4 h-4 mr-2" />
                Edit Post
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Post</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={editedPost.title}
                    onChange={(e) =>
                      setEditedPost({ ...editedPost, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content (Markdown)</Label>
                  <Textarea
                    id="content"
                    value={editedPost.content}
                    onChange={(e) =>
                      setEditedPost({ ...editedPost, content: e.target.value })
                    }
                    className="min-h-[400px] font-mono whitespace-pre-wrap"
                  />
                </div>
                <Button onClick={handleEdit} className="w-full">
                  Save Changes
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <article className="prose prose-slate dark:prose-invert lg:prose-lg mx-auto">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-muted-foreground mb-8">
          {new Date(post.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
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
              ul: ({ children }) => <ul className="my-6">{children}</ul>,
              ol: ({ children }) => <ol className="my-6">{children}</ol>,
              h1: ({ children }) => <h1 className="mt-8 mb-4">{children}</h1>,
              h2: ({ children }) => <h2 className="mt-8 mb-4">{children}</h2>,
              h3: ({ children }) => <h3 className="mt-6 mb-4">{children}</h3>,
              h4: ({ children }) => <h4 className="mt-6 mb-4">{children}</h4>,
              h5: ({ children }) => <h5 className="mt-6 mb-4">{children}</h5>,
              h6: ({ children }) => <h6 className="mt-6 mb-4">{children}</h6>,
              blockquote: ({ children }) => (
                <blockquote className="my-6 border-l-4 border-primary/20 pl-6 italic">
                  {children}
                </blockquote>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
