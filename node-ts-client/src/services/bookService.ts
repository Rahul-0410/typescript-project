import api from "./api";
import type { Book } from "../types/book";

interface BookResponse {
    success: boolean;
    message: string;
    data?: Book[];
}

interface SingleBookResponse {
    success: boolean;
    message: string;
    data?: Book;
}

export const getBooks = async () => {
    const response = await api.get<BookResponse>(
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
    const response = await api.post<SingleBookResponse>(
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
    const response = await api.put<SingleBookResponse>(
        `/book/update-book/${id}`,
        book
    );

    return response.data;
};

export const deleteBook = async (id: string) => {
    const response = await api.delete(
        `/book/delete-book/${id}`
    );

    return response.data;
};