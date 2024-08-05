if(attacking)
{
	speed = 0;
}
else
{
	enemy_basic_walk(2,0,"spr_testy_walk");
}
enemy_attack(64,150,5,"spr_testy_attack","spr_testy_walk","enemy_projectile",[5,"spr_tomato",5,0.1,true,-20,0,"spr_tomato_particle"]);
enemy_necesities(0);