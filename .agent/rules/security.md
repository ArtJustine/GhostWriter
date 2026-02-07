# Security Constraints

## Passive Constraints

*   **API Key Protection**: NEVER commit `.env` files or hardcode API keys (especially `GEMINI_API_KEY`) in the source code.
*   **Frontend Exposure**: Ensure that `GEMINI_API_KEY` is only used on the backend (e.g., in API routes or server actions). Never expose it to the frontend or include it in client-side bundles.
*   **Gitignore**: Always ensure `.env` is listed in `.gitignore`.
