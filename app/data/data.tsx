"use client"

import React, { useEffect, useState } from 'react'
import { columns } from "./columns"
import { DataTable } from './data-table'
import useSWR from 'swr'

interface StackExchangeResponse {
  items: any[];
}

const fetcher = async (url: string) => {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Błąd zapytania: ${res.status} ${res.statusText}`);
    }

    const data: StackExchangeResponse = await res.json();
    return data.items;
  } catch (error: any) {
    throw new Error(`Błąd pobierania danych: ${error?.message}`);
  }
};

export default function Data() {
  const [allItems, setAllItems] = useState<any[]>([]);

  const { data, error } = useSWR(
    'https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow&page=1&pageSize=100&filter=!nNPvSNV7(z',
    fetcher
  );

  useEffect(() => {
    const fetchNextPage = async (page: number, retries: number = 2) => {
      try {
        const nextPageData = await fetcher(
          `https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow&page=${page}&pageSize=100&filter=!nNPvSNV7(z`
        );
        if (nextPageData && nextPageData.length > 0 && page <= 24) {
          setAllItems(prevItems => [...prevItems, ...nextPageData]);
          fetchNextPage(page + 1);
        }
      } catch (error: any) {
        console.error('błąd podczas pobierania danych:', error);
        if (error?.message.includes('400 Bad Request') && retries > 0) {
          console.log(`ponawiam próbę pobrania danych`);
          fetchNextPage(page, retries - 1);
        } else {
          console.error('nie udało się pobrać danych ');
        }
      }
    };

    if (data && data.length > 0) {
      fetchNextPage(1);
    }
  }, [data]);

  if (error) {
    if (error.message.includes('400 Bad Request')) {
      return <div>Błąd: Żądanie jest nieprawidłowe. Sprawdź adres URL i parametry zapytania.</div>;
    }
    return <div>Błąd: {error.message}</div>;
  }

  if (!data) return <div>Ładowanie...</div>;

  return (
    <>
      {allItems.length === 0 && !error ? ( // Jeśli nie ma jeszcze danych, wyświetl "Ładowanie..."
        <div>Ładowanie...</div>
      ) : (
        <DataTable columns={columns} data={allItems} />
      )}
    </>
  )
}