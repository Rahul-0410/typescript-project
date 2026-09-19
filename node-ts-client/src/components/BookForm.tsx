import { useEffect, useState } from "react";
import {
    addBook,
    updateBook,
} from "../services/bookService";

import type { Book } from "../types/book";
import { getErrorMessage } from "../utils/getErrorMessage";
import "./BookForm.css"

interface BookFormProps {
    onBookSaved: () => void;
    editingBook: Book | null;
    onCancelEdit: () => void;
}

const BookForm = ({
    onBookSaved,
    editingBook,
    onCancelEdit,
}: BookFormProps) => {
    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [publishYear, setPublishYear] = useState("");
    const [description, setDescription] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    // Fill the form when editing a book
    useEffect(() => {
        if (editingBook) {
            setName(editingBook.name);
            setAuthor(editingBook.author);
            setPublishYear(
                String(editingBook.publishYear)
            );
            setDescription(editingBook.description);

            setError("");
            setSuccess("");
        } else {
            clearForm();
        }
    }, [editingBook]);

    const clearForm = () => {
        setName("");
        setAuthor("");
        setPublishYear("");
        setDescription("");
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const bookData = {
                name,
                author,
                publishYear: Number(publishYear),
                description,
            };

            let response;

            if (editingBook) {
                response = await updateBook(
                    editingBook._id,
                    bookData
                );
            } else {
                response = await addBook(bookData);
            }

            if (!response.success) {
                setError(response.message);
                return;
            }

            setSuccess(response.message);

            clearForm();

            onBookSaved();

            // Exit edit mode
            if (editingBook) {
                onCancelEdit();
            }

        } catch (error: unknown) {
                setError(getErrorMessage(error, "Something went wrong"));
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className="book-form-container">

        <h2>
            {editingBook ? "Edit Book" : "Add New Book"}
        </h2>

        <form
            className="book-form"
            onSubmit={handleSubmit}
        >

            <div className="form-group">
                <label>Book Name</label>

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter book name"
                    required
                />
            </div>

            <div className="form-group">
                <label>Author</label>

                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Enter author"
                    required
                />
            </div>

            <div className="form-group">
                <label>Publish Year</label>

                <input
                    type="number"
                    value={publishYear}
                    onChange={(e) => setPublishYear(e.target.value)}
                    placeholder="Enter publish year"
                    required
                />
            </div>

            <div className="form-group">
                <label>Description</label>

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter book description"
                    required
                />
            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {success && (
                <div className="success-message">
                    {success}
                </div>
            )}

            <div className="form-actions">

                <button
                    className="form-btn save-btn"
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Saving..."
                        : editingBook
                            ? "Update Book"
                            : "Add Book"}
                </button>

                {editingBook && (
                    <button
                        className="form-btn cancel-btn"
                        type="button"
                        onClick={() => {
                            clearForm();
                            onCancelEdit();
                        }}
                    >
                        Cancel
                    </button>
                )}

            </div>

        </form>
    </div>
);
};

export default BookForm;