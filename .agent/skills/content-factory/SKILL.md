---
name: content-factory
description: Uses Gemini 3 Flash to generate high-volume persona-specific articles and podcast scripts based on onboarding data.
---

# Content Factory Skill

This skill leverages the Gemini 3 Flash model for cost-effective, high-volume content generation.

## Instructions

1.  **Context Loading**:
    *   Retrieve the user's `businessUrl`, `targetAudience`, and `personas` from the `UserConfig` and `Persona` models.
2.  **Persona Article Generation**:
    *   For each persona defined in the onboarding data, generate a high-quality article (minimum 800 words).
    *   The article should be tailored to the specific persona's needs, pain points, and interests.
    *   Total articles to generate: 5 (one per persona or distributed if fewer than 5 personas exist).
3.  **Podcast Script Generation**:
    *   Generate a detailed podcast script based on the overall business context and target audience.
    *   The script should follow a structured format: Introduction, Main Segment, Persona-Specific Insights, and Call to Action.
4.  **Model Configuration**:
    *   Use `gemini-3-flash` for all generation tasks.
    *   Ensure the lowest possible cost for individual tokens by optimizing prompts.
5.  **Output Format**:
    *   Articles should be stored with `type: 'ARTICLE'`.
    *   Podcast scripts should be stored with `type: 'SCRIPT'`.
    *   All content should be linked to the respective `Persona` and `UserConfig`.

## Prompt Guidelines

*   Be concise but comprehensive.
*   Maintain a consistent brand voice as defined by the `businessUrl`.
*   Focus on value-driven content that resonates with the `targetAudience`.
