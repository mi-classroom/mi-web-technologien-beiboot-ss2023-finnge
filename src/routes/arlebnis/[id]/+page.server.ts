import type { EntryGenerator } from './$types';

export const entries = (() => {
    return [
        { id: 'hello-world' },
        { id: 'another-blog-post' }
    ];
}) satisfies EntryGenerator;