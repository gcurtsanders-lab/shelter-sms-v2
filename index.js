import { twiml } from 'twilio';

export const config = {
  api: {
    bodyParser: false, // Required for Twilio
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const MessagingResponse = twiml.MessagingResponse;
  const twimlResponse = new MessagingResponse();

  const shelters = [
    { name: "Gateway Center", addr: "260 Peachtree St NW, Atlanta, GA 30303", close: "8 PM (intake closes)" },
    { name: "Atlanta Mission - Men's Shelter", addr: "235 Alexander St SE, Atlanta, GA 30312", close: "7 PM" },
    { name: "Atlanta Mission - Women's Shelter", addr: "160 Ralph McGill Blvd NE, Atlanta, GA 30308", close: "6 PM" },
    { name: "Salvation Army Red Shield Lodge", addr: "116 Decatur St SE, Atlanta, GA 30303", close: "10 PM (men/women/families)" },
    { name: "Our House Family Shelter", addr: "1710 Joseph E Lowery Blvd NW, Atlanta, GA 30318", close: "5 PM (families only)" },
    { name: "Hope Atlanta Emergency Shelter", addr: "347 John Wesley Dobbs Ave NE, Atlanta, GA 30312", close: "9 PM (hotel/motel for families)" },
    { name: "Union Mission Women's Shelter", addr: "304 Luckie St NW, Atlanta, GA 30313", close: "8 PM" },
    { name: "Atlanta Day Shelter for Women & Children", addr: "153 Luckie St NW, Atlanta, GA 30303", close: "4 PM (day use)" },
    { name: "MUST Ministries Shelter", addr: "675 Seminole Ave NE, Atlanta, GA 30307", close: "9 PM" },
    { name: "Lost-N-Found Youth Shelter", addr: "1034 Ridge Ave SE, Atlanta, GA 30315", close: "10 PM (youth only)" }
  ];

  let reply = "🏠 Shelter Radar – Tonight's Open Beds in Atlanta:\n\n";
  shelters.forEach(s => {
    reply += `→ ${s.name}\n${s.addr}\nOpen till ${s.close}\n\n`;
  });
  reply += "\nReply STOP to unsubscribe. Made by Ollie (5th grade) & dad. #AIForGood";

  twimlResponse.message(reply);

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twimlResponse.toString());
}
