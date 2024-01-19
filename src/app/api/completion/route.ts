import { NextResponse, NextRequest } from 'next/server';
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
 
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
 
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';
 
export async function POST(req: NextRequest) {
  // Extract the `prompt` from the body of the request
  try {
    const { messages } = await req.json();
  
    // Ask OpenAI for a streaming completion given the prompt
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages
    });
   
    // Convert the response into a friendly text-stream
    const stream = await OpenAIStream(response);
   
    // Respond with the stream
   return new StreamingTextResponse(stream)

  } catch (error) {
       // Check if the error is an APIError
       if (error instanceof OpenAI.APIError) {
        const { name, status, headers, message } = error;
        return NextResponse.json({ name, status, headers, message }, { status });
      } else {
        throw error;
      }
  }

}