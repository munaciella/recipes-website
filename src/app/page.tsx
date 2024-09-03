/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { fetchNews } from '@/lib/guardian';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { copy } from '@/copy';

const { description } = copy.home;

const Homepage: NextPage = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadNews = async (page: number) => {
    try {
      const articles = await fetchNews(page);
      if (articles.length > 0) {
        setNews((prevNews) => [...prevNews, ...articles]);
        setHasMore(true);
      } else {
        setHasMore(false);
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to load news');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews(page);
  }, [page]);

  const handleShowMore = () => {
    setLoading(true);
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <main className="w-full lg:mx-6 m-4 max-w-6xl px-6 sm:px-4 mt-10 md:mt-8">
      <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between md:gap-x-8">
        <div className="max-w-3xl w-full">
          <div className="mx-auto max-w-prose">
            <h1 className="mt-6 md:mt-28 lg:mt-16 block text-left text-4xl font-bold leading-8 tracking-tight sm:text-4xl lg:text-5xl">
              {description.heading.top}
              <br />
              <span className="text-secondary-600">
                {description.heading.bottom}
              </span>
            </h1>
            <p className="mt-6 text-lg text-left leading-8 text-secondary-500 sm:text-xl lg:text-2xl">
              {description.paragraph}
            </p>
            <div className="mt-8 flex flex-col space-y-4">
              <Link href="/login" passHref>
                <Button className="w-full md:w-auto px-8">Get Started</Button>
              </Link>
              <Link href="/recipes" passHref>
                <Button variant="outline" className="w-full md:w-auto px-14">
                  Browse Recipes
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="pt-2 md:pt-0">
          <img
            className="h-auto max-w-full md:max-w-[40rem] lg:max-w-[50rem] md:h-72 lg:h-96 lg:-mt-16 md:mt-12 -mt-10"
            src={description.img.src}
            alt={description.img.alt}
          />
        </div>
      </div>

      {/* News Section */}
      <section className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-8">Check Out the Latest News on Plant-Based Diets, Environment & Sustainability</h2>
        {loading && page === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <a
                key={index}
                href={article.webUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2 border rounded-lg shadow-lg hover:shadow-xl dark:border-slate-600 dark:bg-background hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-100 mt-4"
              >
                <img
                  src={article.fields?.thumbnail || '/placeholder-image.png'}
                  alt={article.webTitle}
                  className="w-full h-48 object-cover mb-4 rounded-lg"
                />
                <h3 className="text-lg font-bold mb-2">{article.webTitle}</h3>
                <p className="text-sm font-semibold mb-2">{article.fields?.trailText}</p>
              </a>
            ))}
          </div>
        )}
        {!loading && hasMore && (
          <div className="flex justify-center mt-8">
            <Button onClick={handleShowMore} className='px-10'>Show More News</Button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Homepage;


