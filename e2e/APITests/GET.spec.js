import {test,expect} from "@playwright/test";


test('Get req',async ({request})=>{

    const resp = await request.get('https://jsonplaceholder.typicode.com/todos/1');

    const respJson = await resp.json();
    expect(respJson).toHaveProperty('title','delectus aut autem');
    expect(respJson.title).not.toBeNull()


})