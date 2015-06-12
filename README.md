#Linear L-System Poetry

By [Allison Parrish](http://www.decontextualize.com/)

This is a weird interface for making poetry using
[L-Systems](http://en.wikipedia.org/wiki/L-system) How it works: Paste in a
source text below, and then write a series of symbols and production rules for
those symbols. As you move the "Depth" slider, the interface recursively
expands the symbols with those production rules, creating a string of
characters. These characters are interpreted as instructions for how to
traverse a source text. (E.g., a <tt>P</tt> means "print the current word and
move to the next"; a <tt>N</tt> means "display a new line.") It's sort of like
[drawing an L-System with turtle graphics](http://www.plastaq.com/elsy/)
except, you know, with words instead of pictures.

See it in action [here](http://static.decontextualize.com/lsys/).
