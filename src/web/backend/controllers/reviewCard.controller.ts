import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import fs from 'fs';
import * as mime from 'mime';
import {getRepository} from "typeorm";
import {Room} from "../entities/Room";
import {ReviewCard} from "../entities/ReviewCard";

interface response {
    type: any,
    data: any
}

export default class ReviewCardController implements Controller {

    private reviewCards = getRepository(ReviewCard);

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(this.path, this.createImage);
    }

    public path = '/img-upload';
    public router = express.Router();

    private createImage = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

        let matches = req.body.url.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let response:response = {
            type: '',
            data: ''
        };

        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }

        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
        let extension = mime.getExtension(type);
        let fileName = "image." + extension;
        try {
            fs.writeFileSync("./public/images/cards/" + fileName, imageBuffer, 'utf8');

            const newCard = this.reviewCards.create({
                card_path: fileName
            });
            await this.reviewCards.save(newCard);

            return res.send({"status":"success"});
        } catch (e) {
            next(e);
        }


    };

}
