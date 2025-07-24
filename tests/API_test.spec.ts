import {test, expect} from '@playwright/test'

var token;
var note_id;
var baseURL = 'https://practice.expandtesting.com/notes/api/';

test('Login with invalid credentials (Post)', async ({request})=>{

    const response = await request.post(baseURL + 'users/login', 
                                    {headers:{'Accept':'application/json'},
                                     data:{"email": "invalid@example.com", "password": "wrongpassword"}
                                    })
                                 
    console.log(await response.json())
    var res = await response.json()

    //Assert that the login was unsuccessful
    await expect(response.status()).toBe(401)
    await expect(res.message).toBe('Incorrect email address or password');

})

test('Login with valid credentials (Post)', async ({request})=>{

    const response = await request.post(baseURL + 'users/login', 
                                    {headers:{'Accept':'application/json'},
                                     data:{"email": "demo@remwaste.com", "password": "remwaste123"}
                                    })
                                 
    console.log(await response.json())
    
    var res = await response.json()
    token=res.data.token;

    //Assert that the login was successful
    await expect(response.status()).toBe(200)
    await expect(res.message).toBe('Login successful');

})

test('Creating a new note (Post)', async ({request})=>{

    const response = await request.post(baseURL + 'notes', 
                                    {headers:{'x-auth-token':token,'Accept':'application/json'},
                                     data:{"title": "Test", "description": "Manual test", "category": "Work" }
                                    })
                                 
    console.log(await response.json())
    var res = await response.json()
    note_id = res.data.id;

    // Assert that the note is created successfully
    await expect(response.status()).toBe(200)
    await expect(res.message).toBe('Note successfully created');
    await expect(res.data.title).toBe('Test');
    await expect(res.data.description).toBe('Manual test');
    await expect(res.data.category).toBe('Work')

})

test('Get a created note (Get)', async ({request})=>{

    const response = await request.get(baseURL + 'notes/' + note_id, 
                                    {headers:{'x-auth-token':token,'Accept':'application/json'},
                                     
                                    })
                                 
    console.log(await response.json())
    var res = await response.json()

    // Assert that the note is retrieved successfully
    await expect(response.status()).toBe(200)
    await expect(res.message).toBe('Note successfully retrieved');
    await expect(res.data.title).toBe('Test');
    await expect(res.data.description).toBe('Manual test');
    await expect(res.data.category).toBe('Work')

})

test('Edit a created note (Put)', async ({request})=>{

    const response = await request.put(baseURL + 'notes/' + note_id, 
                                    {headers:{'x-auth-token':token,'Accept':'application/json'},
                                     data:{"id": "68813e909d1b4b02886685c2", "title": "Test",
                                            "description": "Automation Test",
                                            "category": "Work",
                                            "completed": false }
                                    })
                                 
    console.log(await response.json())
    var res = await response.json()

    // Assert that the note is edited successfully
    await expect(response.status()).toBe(200)
    await expect(res.message).toBe('Note successfully Updated');
    await expect(res.data.title).toBe('Test');
    await expect(res.data.description).not.toBe('Manual test');
    await expect(res.data.description).toBe('Automation Test');
    await expect(res.data.category).toBe('Work')

})

test('Delete a created note (Delete)', async ({request})=>{

    const response = await request.delete(baseURL + 'notes/' + note_id, 
                                    {headers:{'x-auth-token':token,'Accept':'application/json'},
                                     
                                    })
                                 
    console.log(await response.json())
    var res = await response.json()

    // Assert that the note is deleted successfully
    await expect(response.status()).toBe(200)
    await expect(res.message).toBe('Note successfully deleted');

})

