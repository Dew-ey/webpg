# Pico CTF Challenges
Challenges that I have done in the last few days, these are all easy challenges meant to brush up on skills.

## Riddle Registry
### Description
Hi, intrepid investigator! 📄🔍 You've stumbled upon a peculiar PDF filled with what seems like nothing more than garbled nonsense. But beware! Not everything is as it appears. Amidst the chaos lies a hidden treasure—an elusive flag waiting to be uncovered.
Find the PDF file here Hidden Confidential Document and uncover the flag within the metadata.

### Procedure
- First thing I do is read through the main text in the pdf, its a basic document with some hidden text, not much I can do with this. 
- Second course of action is to download the pdf and then open it in google so I can see the metadata
- Opening up the document properties in google I can see this information

![alt text](https://raw.githubusercontent.com/Dew-ey/Writeups/main/StoredImages/EZPICO/RIDDLEREG/img1.jpg "image1")

- Looking like it was made using pypdf, I’ll make note of that for later in case I need it. 
- Copying the information I get from the author, it looks like something I’ve seen before…
  - cGljb0NURntwdXp6bDNkX20zdGFkYXRhX2YwdW5kIV8zNTc4NzM5YX0=
- Im going to make the assumption that this is base64 and decode it.
- Sure enough it solves to picoCTF{puzzl3d_m3tadata_f0und!_3578739a}

## Log Hunt
### Description
Our server seems to be leaking pieces of a secret flag in its logs. The parts are scattered and sometimes repeated. Can you reconstruct the original flag?
Download the logs and figure out the full flag from the fragments.

### Procedure
- Downloading the .log file it shows alot of simple info, error, debug and warn logs.
- Using a ctrl+f I find at least a portion of the log picoCTF{us3_
- Using this information I should be able to search through the log file to be able to find the rest of the flag
- Second part: y0urlinux_
- Third part: sk1lls_
- Last part: cedfa5fb}
- Now this would be easier to assemble using linux commands in the cli but I do not have a virtual machine installed at the moment so I am currently using a simple ctrl+f inside a notepad instance
- Final flag: picoCTF{us3_y0urlinux_sk1lls_cedfa5fb}

## Hidden in Plain Sight
### Description
You’re given a seemingly ordinary JPG image. Something is tucked away out of sight inside the file. Your task is to discover the hidden payload and extract the flag.
Download the jpg image here.
#### Hint
Download the jpg image and reads its metadata

### Procedure
- First course of action is to download the image

![alt text](https://raw.githubusercontent.com/Dew-ey/Writeups/main/StoredImages/EZPICO/hplainsight/sample.png "image2")

So It can be best assumed that the flag is somewhere in the image metadata. So I am going to use a tool build into kali called exiftool which can be used to extract the metadata from images. With the following command
`exiftool img.jpg`
Running the command gives me the image metadata, here in the metadata I find a comment with a value of `c3RlZ2hpZGU6Y0VGNmVuZHZjbVE9` so I plug this information into cyberchef using base64 decode and get `steghide:cEF6endvcmQ=` this I can assume is the steghide command to hide something inside of the picture

Solving the section to the right of the setghide command reveals the translated password: `pAzzword`

Running the command `steghide extract -sf img.jpg` extracts the contents of the flag to a text document called flag.txt the contents being: `picoCTF{h1dd3n_1n_1m4g3_f051f2e8}`

## Flag in Frame
### Description
The SOC team discovered a suspiciously large log file after a recent breach. When they opened it, they found an enormous block of encoded text instead of typical logs. Could there be something hidden within? Your mission is to inspect the resulting file and reveal the real purpose of it. The team is relying on your skills to uncover any concealed information within this unusual log. Download the encoded data here: Logs Data. Be prepared—the file is large, and examining it thoroughly is crucial.
#### Hint
Use base64 to decode the data and generate the image file.
### Procedure
Downloading and opening the file it seems like its completely full of base64, so my actions from here should be pretty simple. I need to decode the file and parse it for the flag. 

The command I will use looks like this
`Base64 -d logs.txt | grep -E '\bpico' logs.txt`
This above section was a dead end, going back and reviewing the hint made me feel like a fool
I ran this instead as I am looking for an image `base64 -d logs.txt > output.jpg`
This is the image that was outputted:

![alt text](https://raw.githubusercontent.com/Dew-ey/Writeups/main/StoredImages/EZPICO/flagINframe/unnamed.png "image3")

This image has a string of numbers and letters inside of it, extracting this we get: `7069636F4354467B666F72656E736963735F616E616C797369735F69735F616D617A696E675F32346431363839357D`
converting the above from hex we get the flag:
`picoCTF{forensics_analysis_is_amazing_24d16895}`

## Crack the Gate
### Description
We’re in the middle of an investigation. One of our persons of interest, ctf player, is believed to be hiding sensitive data inside a restricted web portal. We’ve uncovered the email address he uses to log in: ctf-player@picoctf.org. Unfortunately, we don’t know the password, and the usual guessing techniques haven’t worked. But something feels off... it’s almost like the developer left a secret way in. Can you figure it out?

Additional details will be available after launching your challenge instance.
### Procedure
Starting the task we find a simple login page, we know the user email is ctf-player@picoctf.org, taking a look at the websites code we look to get a quick idea of the operation of the page. We can see in the js where the code says ` if (data.success) { prompt('Login successful!\nFlag:', data.flag);` We can figure that it will return the flag when presented with the proper password or condition. Earlier in the code we also notice a comment that says.
`<!-- ABGR: Wnpx - grzcbenel olcnff: hfr urnqre "K-Qri-Npprff: lrf" -->`
`<!-- Remove before pushing to production! -->`
So in this we can assume the dev left something that they intended for us to not see, so throwing it into cyberchef using the magic recipe.
The return gives us this 
NOTE: Jack - temporary bypass: use header "X-Dev-Access: yes"
So this tells us we will need to add the header X-Dev-Access: yes would allow us to enter the site using this as its password
Setting it up in brupsuiete we are able to grab our flag 

![alt text](https://raw.githubusercontent.com/Dew-ey/Writeups/main/StoredImages/EZPICO/crackGate/burp.png "image4")

`picoCTF{brut4_f0rc4_83812a02}`

## Corrupted File
### Description
This file seems broken... or is it? Maybe a couple of bytes could make all the difference. Can you figure out how to bring it back to life? Download the file here.
### Procedure
Looking at the header for the file we can see JFIF, meaning this file is a .JPEG, 

![alt text](https://raw.githubusercontent.com/Dew-ey/Writeups/main/StoredImages/EZPICO/corruptedFile/fileHead.png "image5")

Opening it in XXD I also notice that the start of the file is missing a portion of the JPEG magic codes which are `FF D8 FF E0` Applying this code to the front of it should allow us to fix it
Running this command which fixes the broken bytes should allow us to open the image `(printf '\xff\xd8' && tail -c +3 file) > repair.jpg`
Seen below

![alt text](https://raw.githubusercontent.com/Dew-ey/Writeups/main/StoredImages/EZPICO/corruptedFile/flag.png "image6")

Inside of the image the flag can be found
`picoCTF{r3st0r1ng_th3_by73s_1512b52a}`

## DISKO 1
### Description
Can you find the flag in this disk image? Download the disk image here. 
#### Hint
Maybe Strings could help? If only there was a way to do that?
### Procedure
What im going to be doing is scanning through the disk image by first using the strings command then using grep to look for the flag.
The command I am using is
`Strings disko-1.dd | grep “pico”`
Running the above command outputs the flag to the terminal, the flag being:
`picoCTF{1t5_ju5t_4_5tr1n9_be6031da}`

## Hashcrack
### Description
A company stored a secret message on a server which got breached due to the admin using weakly hashed passwords. Can you gain access to the secret stored within the server?

Additional details will be available after launching your challenge instance.
### Procedure
The challenge begins with an nc instance that I need to connect to using the command 
`nc verbal-sleep.picoctf.net 63363`
When I connect I am presented with this screen:

![alt text](https://raw.githubusercontent.com/Dew-ey/Writeups/main/StoredImages/EZPICO/hashCrack/img1.png "image7")

So the first thing I want to do is determine what kind of hash this is. So using hash identifier in kali i attempt to determine its type:

![alt text](https://raw.githubusercontent.com/Dew-ey/Writeups/main/StoredImages/EZPICO/hashCrack/hashID1.png "image8")

Running the command HashID says that it is most likely a MD5 hash, md5 is a very vulnerable algorithm so I should be able to crack this hash very simply.
Going to the md5 hash checking page found at https://passwordrecovery.io/md5/ and plugging in my hash I find the answer to be `password123`
Entering the password I am presented with another hash to solve, so the first course of action is to id it:

![alt text](https://raw.githubusercontent.com/Dew-ey/Writeups/main/StoredImages/EZPICO/hashCrack/hashID2.png "image9")

So assuming its a SHA-1 I need to find a way to crack it. So I plug this hash into first a .txt file using echo:
`echo <hash> >> hash2.txt` 
From there I then run the program using John referencing the rockyou wordlist, doing so presents me my second hashed password.
The command that I will be using is `john --wordlist=/usr/share/wordlists/rockyou.txt --format=raw-SHA1 hash2.txt`

![alt text](https://raw.githubusercontent.com/Dew-ey/Writeups/main/StoredImages/EZPICO/hashCrack/john1.png "image0")

John has found the password to be `letmein`
I am met with yet another hash that needs to be cracked, this one being: `916e8c4f79b25028c9e467f1eb8eee6d6bbdff965f9928310ad30a8d88697745`
So running hashID to determine its type gives me: SHA-256 or Haval-256, im going to assume that it is sha 256. So I will be running basically the same john command as above to crack this last one just simply changing the type of hasing it's using.

![alt text](https://raw.githubusercontent.com/Dew-ey/Writeups/main/StoredImages/EZPICO/hashCrack/john2.png "image11")

John outputs what I hope to be my final needed password: `querty098`
With the inputting of the last password I get the flag: 
`picoCTF{UseStr0nG_h@shEs_&PaSswDs!_4c95d69f}`

## Verify
### Description
People keep trying to trick my players with imitation flags. I want to make sure they get the real thing! I'm going to provide the SHA-256 hash and a decrypt script to help you know that my flags are legitimate. ssh -p 54067 ctf-player@rhea.picoctf.net Using the password 6abf4a82. Accept the fingerprint with yes, and ls once connected to begin. Remember, in a shell, passwords are hidden!

  Checksum: b09c99c555e2b39a7e97849181e8996bc6a62501f0149c32447d8e65e205d6d2
  To decrypt the file once you've verified the hash, run `./decrypt.sh files/<file>`.
### Procedure
First thing I do is connect to the provided ssh, then I run a ls to find my local files. Here i find, checksum.txt, decrypt.sh, and files. Navigating to the files directory I find well, alot of files. 

![alt text](https://raw.githubusercontent.com/Dew-ey/Writeups/main/StoredImages/EZPICO/verify/files.png "image12")

From here I run the command `sha256sum files/* | grep “checksum”` This command can be broken down into its two parts, the first part grabs the sha256 sum of all the files in the directory files, since hashes will always be the same if its the same file I can simply grep the listed options searching for the correct checksum. Doing this gives me the output of the correct file: 

![alt text](https://raw.githubusercontent.com/Dew-ey/Writeups/main/StoredImages/EZPICO/verify/identifiedSUM.png "image12")

From here I run the decrypt script and get the flag: `./decrypt.sh files/451fd69b`
Flag: `picoCTF{trust_but_verify_451fd69b}`