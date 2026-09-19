import api from "./api";
import type { Book } from "../types/book";

interface BooksResponse {
    success: boolean;
    message: string;
    data?: Book[];
}

interface BookResponse {
    success: boolean;
    message: string;
    data?: Book;
}

interface DeleteBookResponse {
    success: boolean;
    message: string;
    data?: null;
}

export const getBooks = async () => {
    const response = await api.get<BooksResponse>(
        "/book/get-books"
    );

    return response.data;
};

export const addBook = async (book: {
    name: string;
    author: string;
    publishYear: number;
    description: string;
}) => {
    const response = await api.post<BookResponse>(
        "/book/add-book",
        book
    );

    return response.data;
};

export const updateBook = async (
    id: string,
    book: {
        name: string;
        author: string;
        publishYear: number;
        description: string;
    }
) => {
    const response = await api.put<BookResponse>(
        `/book/update-book/${id}`,
        book
    );

    return response.data;
};

export const deleteBook = async (id: string) => {
    const response = await api.delete<DeleteBookResponse>(
        `/book/delete-book/${id}`
    );

    return response.data;
};