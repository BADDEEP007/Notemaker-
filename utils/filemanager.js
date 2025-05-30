import fs from "fs/promises";
import path, { dirname } from "path";
import { randomUUID } from 'crypto';
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from 'uuid';
import { type } from "os";

const __filepath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filepath);

const filepath = path.join(__dirname, "../data/data.json");


export const readnotes = async () => {
  try {
    const data = await fs.readFile(filepath, "utf8");

    return data;
  } catch (error) {
    return error;
  }
};

const writefile = async (data) => {
  try {
    await fs.writeFile(filepath, data);

    return data;
  } catch (error) {
    return error;
  }
};

export const addnotes = async (note) => {
  console.log(typeof note);
if (  !note.Title || typeof note.Title !== 'string' && !note.Content || typeof note.Content !== 'string') {
  res.writeHead(400, { "Content-Type": "application/json" });
  return res.end(JSON.stringify({ error: "Invalid title or content" }));
}
  const noteid = uuidv4()
  try {
note = {
    ...note,
    Board_id: 1,
    User_id: 1,
    Note_id: noteid,
    Created_on :  new Date().toLocaleString()
};


    let allnotesjson = JSON.parse(await readnotes());
  
   
    allnotesjson.push(note)
    await writefile(JSON.stringify(allnotesjson));
    return JSON.stringify({

      message: "Note added successfully"
    })
    
  } catch (error) {

    return error;
  }
}


export const deletnote = async (id) => {
  try {
    console.log(typeof id)
    let allusersjson = JSON.parse(await readnotes());
    let afterdeleteuser = allusersjson.filter((user) => user.id !== Number(id));
    console.log(afterdeleteuser,allusersjson)
    if (allusersjson.length == afterdeleteuser.length) {
      return {
        message: "delete cant  be done id not found "
      }
    } else {

      await writefile(JSON.stringify(afterdeleteuser));
      return "User deleted successfully";
    }
  } catch (error) {
    return error;
  }
}

export const getnotes = async (id) => {
  try {

    const allusers = JSON.parse(await readnotes());
    let iduser = allusers.filter((user) => user.id == id);

    if (iduser.length > 0) {

      return iduser
    }
    else {
      console.log(2)
      return [{ message: " Id not fouund" }]
    }
  } catch (error) {
    return error

  }
}

export const putnotes = async (body)=>{
 if (!body.id || !body.name || typeof body.name !== 'string') {
  res.writeHead(400, { "Content-Type": "application/json" });
  return res.end(JSON.stringify({ error: "Invalid title or content" }));
}

  try {
    // Step 1: Read the file and parse JSON
    const rawData = await fs.readFile(filepath, 'utf8');
    const notes = JSON.parse(rawData || '[]');
    // Step 2: Update the specific note
    const updatedNotes = notes.map(note =>
      note.id === body.id ? { ...note, ...body } : note
    );

    // Step 3: Write back the updated array to file
    await fs.writeFile(filepath, JSON.stringify(updatedNotes, null, 2));

    return { message: 'Note updated successfully' };

  } catch (error) {
    return { error: error.message };
  }
}


