"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircle, Trash2 } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
}

export default function Blog() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
      return;
    }

    setPosts(data || []);
    setLoading(false);
  }

  const handleDelete = async (postId: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the Link from triggering
    if (!user || user.email === "test@test.com") return;

    const { error } = await supabase.from("posts").delete().eq("id", postId);

    if (error) {
      console.error("Error deleting post:", error);
      return;
    }

    await fetchPosts();
  };

  function getReadTime(content: string) {
    const text = content.replace(/<[^>]*>/g, "");
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  }

  function getExcerpt(content: string) {
    // Create a temporary div to parse HTML content
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    // Get text content from specific elements we want to include
    const textParts: string[] = [];
    const validElements = tempDiv.querySelectorAll("p, h1, h2, h3, h4, h5, h6");

    for (const element of validElements) {
      // Skip empty paragraphs
      if (element.textContent?.trim()) {
        textParts.push(element.textContent.trim());
      }

      // Break if we have enough content
      if (textParts.join(" ").length > 200) {
        break;
      }
    }

    // Join the text parts and limit to ~200 characters
    let excerpt = textParts.join(" ");
    if (excerpt.length > 200) {
      excerpt = excerpt.slice(0, 200).trim();
      // Try to end at a complete word
      const lastSpace = excerpt.lastIndexOf(" ");
      if (lastSpace > 150) {
        // Only trim to last word if we're not cutting too much
        excerpt = excerpt.slice(0, lastSpace);
      }
      excerpt += "...";
    }

    return excerpt;
  }

  const canManagePosts = user && user.email !== "test@test.com";

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Blog</h1>
          <p className="text-muted-foreground">
            Thoughts, stories, and technical guides
          </p>
        </div>
        {canManagePosts && (
          <Button asChild>
            <Link href="/blog/new">
              <PlusCircle className="w-4 h-4 mr-2" aria-hidden="true" />
              New Post
            </Link>
          </Button>
        )}
      </div>

      {loading ? (
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-secondary rounded w-3/4"></div>
                <div className="h-20 bg-secondary rounded-lg w-full"></div>
                <div className="flex items-center gap-4">
                  <div className="h-4 bg-secondary rounded w-32"></div>
                  <div className="h-4 bg-secondary rounded w-20"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <Card className="p-8 hover:shadow-lg transition-all duration-200 group">
                <article>
                  <header className="mb-4">
                    <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <time dateTime={post.created_at}>
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      <span>·</span>
                      <span>{getReadTime(post.content)}</span>
                    </div>
                  </header>
                  <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                    <p className="line-clamp-3">{getExcerpt(post.content)}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm font-medium text-primary group-hover:underline">
                      Read more
                    </span>
                    {canManagePosts && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => handleDelete(post.id, e)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                </article>
              </Card>
            </Link>
          ))}

          {posts.length === 0 && (
            <Card className="p-8 text-center">
              <h2 className="text-xl font-semibold mb-2">No posts yet</h2>
              <p className="text-muted-foreground mb-6">
                Create your first blog post to get started
              </p>
              {canManagePosts && (
                <Button asChild>
                  <Link href="/blog/new">
                    <PlusCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                    Create First Post
                  </Link>
                </Button>
              )}
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
