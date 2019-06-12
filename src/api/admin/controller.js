import {
    sendMail
} from './model'

export const mensajeria = (req, res) => {
    sendMail(req.body).then(
        result => {
            console.log('probando')
            res.json(result)
        },
        error => {
            res.json({ error: error })
        }
    )
}