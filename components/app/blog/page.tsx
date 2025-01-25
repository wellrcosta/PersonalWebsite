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
    if (!user) return;

    const { error } = await supabase.from("posts").delete().eq("id", postId);

    if (error) {
      console.error("Error deleting post:", error);
      return;
    }

    await fetchPosts();
  };

  function getReadTime(content: string) {
    // Remove HTML tags for word count
    const text = content.replace(/<[^>]*>/g, "");
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  }

  function getExcerpt(content: string) {
    // Remove HTML tags and decode HTML entities
    const div = document.createElement("div");
    div.innerHTML = content;
    const text = div.textContent || div.innerText || "";
    const words = text.trim().split(/\s+/);
    return words.slice(0, 30).join(" ") + (words.length > 30 ? "..." : "");
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Blog</h1>
          <p className="text-muted-foreground">
            Thoughts, stories, and technical guides
          </p>
        </div>
        {user && (
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
                <div className="h-6 bg-secondary rounded w-3/4"></div>
                <div className="h-4 bg-secondary rounded w-5/6"></div>
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-secondary rounded w-24"></div>
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
              <Card className="p-6 hover:shadow-lg transition-shadow duration-200 group">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                    <p className="text-muted-foreground mb-4">
                      {getExcerpt(post.content)}
                    </p>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span>{getReadTime(post.content)}</span>
                    </div>
                  </div>
                  {user && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity ml-4"
                      onClick={(e) => handleDelete(post.id, e)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              </Card>
            </Link>
          ))}

          {posts.length === 0 && (
            <Card className="p-8 text-center">
              <h2 className="text-xl font-semibold mb-2">No posts yet</h2>
              <p className="text-muted-foreground mb-6">
                Create your first blog post to get started
              </p>
              {user && (
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
