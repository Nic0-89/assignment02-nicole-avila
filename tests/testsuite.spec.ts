import {test, expect} from '@playwright/test'

test.describe('Test suite backend V1',() => {
    test('Test case 01 - Get all posts', async ({ request }) => {

        var getPostsResponse = await request.get('http://localhost:3000/posts');
        expect(getPostsResponse.ok()).toBeTruthy();

      });

})

