import pool from "../../../lib/database";

export default async function handler(req, res) {
    try{
        let result = {};
        let language = req.query.language.toLowerCase();
        if (!language){
            return res.status(400).json({detail:"language is a required parameter."})
        }
        let {rows} = await pool.query('SELECT * FROM general WHERE language = $1 LIMIT 1', [language]);
        if(rows.length <= 0){
            return res.status(404).json({detail:"Sorry there is no description for this language."});
        }

        result.general = rows[0];

        result.projects = (await pool.query('SELECT * FROM projects WHERE not is_hidden AND language = $1 ORDER BY id DESC', [language])).rows;

        res.status(200).json({result: result})
    }
    catch(e){
        res.status(500).json({detail: "An unexpected error happened."})
    }
}