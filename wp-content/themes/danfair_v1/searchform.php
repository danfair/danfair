<form method="get" id="searchform" class="sidebar__search-form" action="<?php bloginfo('url'); ?>/">
    <label class="hidden" for="s"><?php _e('Search:'); ?></label>
    <input type="text" value="<?php the_search_query(); ?>" name="s" id="s" />
    <input type="submit" id="searchsubmit" value="GO" />
</form>