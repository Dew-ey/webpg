#h1 Pico CTF Challenges
Challenges that I have done in the last few days, these are all easy challenges meant to brush up on skills.

#h2 Riddle Registry
#h3 Description
Hi, intrepid investigator! 📄🔍 You've stumbled upon a peculiar PDF filled with what seems like nothing more than garbled nonsense. But beware! Not everything is as it appears. Amidst the chaos lies a hidden treasure—an elusive flag waiting to be uncovered.
Find the PDF file here Hidden Confidential Document and uncover the flag within the metadata.

#h3 Procedure
- First thing I do is read through the main text in the pdf, its a basic document with some hidden text, not much I can do with this. 
- Second course of action is to download the pdf and then open it in google so I can see the metadata
- Opening up the document properties in google I can see this information
![alt text](https://github.com/Dew-ey/Writeups/blob/main/StoredImages/EZPICO/RIDDLEREG/img1.jpg "image1")
- Looking like it was made using pypdf, I’ll make note of that for later in case I need it. 
- Copying the information I get from the author, it looks like something I’ve seen before…
  - cGljb0NURntwdXp6bDNkX20zdGFkYXRhX2YwdW5kIV8zNTc4NzM5YX0=
- Im going to make the assumption that this is base64 and decode it.
- Sure enough it solves to picoCTF{puzzl3d_m3tadata_f0und!_3578739a}
 
