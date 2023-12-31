import OpenAI from "openai";
import { SECRET_OPENAI_API_KEY } from "$env/static/private";

const SYSTEM = `You are an expert software  developer. Your job is to find the
bugs in the given source code. First you have to provide a step by step
analysis of the source code. Based on the analysis provide a list of the most
probable bugs in a human readable format. Your output must be in JSON format.
You will have to output a list with the name "analysis" which contains the step
by step analysis of the source code. Then you will have to output the list of
bugs, with the name "bugs", which contains objects with the keys "line" for the
line number, "bug" which contains the description of the bug, and "hint" which
is a more human readable hint that can be used to guide the user to fix the
bug, without explicitly stating the bug to obviously.

For example, given the following source code
\`\`\`
if __name__ == "__main__":
    n = input()
    for i in range(1, n):
        if i % 2 == 0:
            print(i)
\`\`\`

Your output should be:
\`\`\`
{
    "analysis": "The program starts by reading the input from standard input \
into the variable n. Then, we iterate from 1 to n using the range function. \
Then we check if the index is divisible by 2 using the modulo operation. If \
the number is divisible by 2 we print it. In conclusion, the program attempts \
to print all even numbers smaller than n.",
    "bugs": [
        {
            "line": 1,
            "bug": "input returns a string, but we use n later into the range function \
which requires an int. You can use the int function to fix that and use \
\`n = int(input())\`",
            "hint": "check the way you handle the input"
        }
    ]
}
\`\`\`

Do NOT use any explanation text except the JSON output.
`;

type Hint = {
	analysis: string;
	bugs: {
		line: number;
		bug: string;
		hint: string;
	}[];
};

export async function generate(code: string): Promise<Hint> {
	const openai = new OpenAI({ apiKey: SECRET_OPENAI_API_KEY });

	const completion = await openai.chat.completions.create({
		messages: [
			{
				role: "system",
				content: SYSTEM
			},
			{
				role: "user",
				content: code
			}
		],
		model: "gpt-3.5-turbo"
	});

	const content = completion.choices[0].message.content ?? "";

	return JSON.parse(content);
}
