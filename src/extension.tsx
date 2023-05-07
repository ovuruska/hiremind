import * as vscode from 'vscode';
import axios from 'axios';
import * as fs from 'fs';

export async function activate(context: vscode.ExtensionContext) {
	const code = await vscode.window.showInputBox({
	  prompt: 'Please enter the 20-digit code',
	  validateInput: (input: string) => {
		return input.length === 20 && /^[a-zA-Z0-9]+$/.test(input) ? null : 'Code must be exactly 20 alphanumeric characters';
	  },sdsd
	});
  
	if (code) {
	  try {
		
		// Replace this URL with the actual API endpoint for your database
		const apiUrl = 'https://mockbin.org/bin/684d7b88-3e3c-4e1c-a7c7-bc51a65e4815';
  
		// Make the API request and get the question
		const response = await axios.post(apiUrl, { code });
  
		if (response.data && response.data.question) {
		  const question = response.data.question;
		  const questionFileName = 'question.txt';
		  const solutionFileName = 'solution.tsx';
  
		  // Create the question and solution files in the current workspace
		  const workspaceFolder = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
  
		  if (workspaceFolder) {
			const questionFilePath = `${workspaceFolder}/${questionFileName}`;
			const solutionFilePath = `${workspaceFolder}/${solutionFileName}`;
  
			// Write the question to the question file
			fs.writeFileSync(questionFilePath, question);
  
			// Create an empty solution file
			fs.writeFileSync(solutionFilePath, '');
  
			// Open the question and solution files in the editor
			const questionFileUri = vscode.Uri.file(questionFilePath);
			const solutionFileUri = vscode.Uri.file(solutionFilePath);
  
			vscode.window.showTextDocument(questionFileUri, { preview: false });
			vscode.window.showTextDocument(solutionFileUri, { preview: false });
		  } else {
			vscode.window.showErrorMessage('No workspace folder is open');
		  }
		} else {
		  vscode.window.showErrorMessage('Failed to fetch the question');
		}
	  } catch (error) {
		console.log("anneni sikim");
	  }
	}
  }
  