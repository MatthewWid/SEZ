#S.E.Z. - SifiGame EZ
	
This mod was produced and developed by Matthew W.
Intended for use in the game "SifiGame" by Jack R.

My Website: http://www.mattshub.com

Sifi Game on Github: https://github.com/nugyflex/sifigame

#Installation
Installing SEZ is very simple, this is a step by step guide on how to get the mod working with the latest version of Sifigame, I will make a visual tutorial in the future as I understand the explanation may be a bit confusing.  

1. Assuming that you have already downloaded the game, go to the game folder.  
2. Next, open *sifigame/SifiGame/Sifigame* and drag/drop or copy/paste the *mod.js* file into that directory.  
3. Next, open *default.html* in that same directory, scroll to the end of the script tags and append **\<script src="mod.js"\>\</script\>** onto them.  
4. Next, go to the *js* folder and open *draw.js*, then scroll to the end of the **this.draw = function {** function, and append **sez();** to the end.
5. Congratulations, you have installed the mod! Now you can open *default.html* and get playing, enjoy!

#The Console

A new addition to the mod features a console.  
This allows you to change elements of the game by typing certain commands.  
Press the "~" to bring up the console, it will appear in the bottom left.

Current commands:

**Command** | **Parametres** | **Description**
--------------|----------------|-----------------
ammo | *number* | Set current ammo reserve (Doesn't change current ammo in magazine)
health | *number* | Set current health (Starting health is 100)
cash | *number* | Set current money
print | *text* | Print text on screen
god |  | Toggle god mode (no loss of health) on and off
tracers |  | Toggle tracers on and off
