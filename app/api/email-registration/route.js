import { NextResponse } from "next/server";
import path from 'path';
import fs from 'fs';

function  buildPath() {
    return path.join(process.cwd(), 'data', 'data.json')
}

function extractData(filePath) {
    const jsonData = fs.readFileSync(filePath);
    const data = JSON.parse(jsonData);
    return data;
}


export async function POST(req) {
    const { email, eventId } = await req.json();

    if(!email | !email.includes('@')) {
        return NextResponse.json({response: `Invalid email address`},{
            status: 422
        });
    }

    const filePath = buildPath();
    const { events_categories, allEvents } = extractData(filePath);
    let statusCode = 200;
    if(!allEvents) {
        return NextResponse.json({response: `Events data not found`},{
            status: 404
        });
    }

    const newAllEvents = allEvents.map(ev => {
        if(ev.id === eventId) {
            if(ev.emails_registered.includes(email)) {
                statusCode = 201;
                return ev;
            }
            return {
                ...ev,
                emails_registered: [ ...ev.emails_registered, email]
            }

        }
        return ev;
    })

    fs.writeFileSync(
        filePath,
        JSON.stringify({ events_categories, allEvents: newAllEvents
        }));

    if(statusCode === 200) {
        return NextResponse.json({response: `You has been registerd successfully with the email: ${email}`});
    } else if (statusCode===201){
        return NextResponse.json({response: `This email has already been registered`},{
            status: 201
        });
    }


}
