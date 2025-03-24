// const input = document.getElementById("inputs");

// const output = document.getElementById("result");

// const getUser = async () => {
//   try {
//     const username = input.value;
//     const match = username.match(/with\s+(\w+)(?=\s+in|$)/);

//     const response = await fetch(
//       "https://api.groq.com/openai/v1/chat/completions",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           'Authorization':
//             "Bearer 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",
//         },
//         body:JSON.stringify({
//           model: "llama-3.3-70b-versatile",
//           messages: [
//             {
//                 role: "system",
//                 content: "You are an AI that generates only functional HTML and JavaScript code, which can be inserted into a <div id='result'></div>. Ensure all scripts execute properly."
//             },
//             {
//               role:"user",
//               content:input.value + `https://api.github.com/users/${}`
//             }
//           ]
//         })

//       }
//     );

//     const data = await response.json();
//   } catch (Error) {
//     console.log("Error", Error);
//   }
// };

const input = document.getElementById("inputs");
const output = document.getElementById("result");

const getUser = async () => {
  try {
    const prompt = input.value.trim();
    let username = null;

    const match = prompt.match(/(\w+)(?=\s+in|$)/i);
    if (match) {
      username = match[1];
    } else if (!/\s/.test(prompt)) {
      username = prompt;
    }

    if (!username) {
      output.innerHTML = "No username found in the prompt.";
      return;
    }

    console.log(username);

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer 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",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content:
                "You are an AI that generates only functional HTML and JavaScript code, which can be inserted into a <div id='result'></div>. Ensure all scripts execute properly.",
            },
            {
              role: "user",
              content: input.value + `https://api.github.com/users/${username}`,
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log(data);

    if (data.choices && data.choices.length > 0) {
      output.innerHTML = data.choices[0].message.content;
      executeScripts(output);
    } else {
      output.innerHTML = "Error: Unexpected response format.";
    }

    // const newdata = data.choices[0].message.content;
    // executeScripts(output);
  } catch (Error) {
    console.log("Error", Error);
    output.innerHTML = "Error: " + Error.message;
  }
};

function executeScripts(element) {
  const scripts = element.getElementsByTagName("script");

  for (let i = 0; i < scripts.length; i++) {
    <div class="bg-white text-black p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105">
    const newScript = document.createElement("script");
    if (scripts[i].src) {
      newScript.src = scripts[i].src;
      newScript.onload = () => console.log(`Loaded: ${scripts[i].src}`);
      document.body.appendChild(newScript);
    } else {
      newScript.textContent = scripts[i].textContent;
      document.body.appendChild(newScript);
    }
    </div>
  }
}
