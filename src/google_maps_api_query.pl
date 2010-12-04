#####
##### 

use LWP::Simple;
use utf8; 
use Encode; 

open DAT, "<$ARGV[0]" or die "cannot open file";

# District (to help google a littlebit)
$district = $ARGV[1];


while(<DAT>){
	sleep(1);
	chomp;
	my $addr = $_;
	$i++;
	print "$addr";
	$url = "http://maps.google.com/maps/geo?q=".$addr.", ".$district.", Berlin, Germany&output=xml&key=abcdefg&eo=utf8"; 
	$geocode = "";
	$geocode = encode( "UTF-8", get $url);
	if($geocode =~ /<code>620<\/code>/){
		print "ran out of quota: error code 620\n\n";
		exit;
		}	
	if($geocode =~ s,<Placemark id="p2">,,){
			print OUT "\t more than one possible place found\n";
			next;
		}
	elsif($geocode =~ m/<coordinates>(.*?),(.*?),.<\/coordinates>/si){
		print "\t$1\t$2\n";
		}
	else {
		print "\tnothing found\n";
	}
}

