<?php 
    update_option('current_page_template','about-page');
    get_header();
    the_post();
?>
    <section class="page-sub-header about-bg">
        <div class="page-sub-header__text max-width-wrapper">
            <h1><?php the_title(); ?></h1>
        </div>
    </section>
    <section class="page-content about-section">
        <div class="content-wrapper max-width-wrapper">
            <h2>Meet me</h2> 
            <div class="page-content__content-left">
                <?php the_content(); ?>
                <h3>What I Enjoy</h3>
                <?php the_field("what-i-enjoy"); ?>
                <h3>Skills</h3>
                <?php the_field("skills-intro"); ?>
                <div class="about-section__skills-bar-chart">
                    <div class="skills-bar-chart__bar orange-bar html"><p>HTML5</p></div>
                    <div class="skills-bar-chart__bar orange-bar css"><p>CSS3</p></div>
                    <div class="skills-bar-chart__bar blue-bar js"><p>JS/JQUERY</p></div>
                    <div class="skills-bar-chart__bar blue-bar ps"><p>PHOTOSHOP</p></div>
                    <div class="skills-bar-chart__bar blue-bar wp"><p>WORDPRESS DEV</p></div>
                    <div class="skills-bar-chart__bar blue-bar php"><p>PHP/MYSQL</p></div>
                </div>
            </div>
            <aside class="sidebar">
                <img src="<?php echo bloginfo('stylesheet_directory'); ?>/img/headshot.jpg" alt="Dan Fair" class="about-section__headshot">
                <div class="about-section__quick-facts">
                    <h4>Fun facts</h4>
                    <p>I am a Hoosier!</p>
                    <p>My initials are next to each other on the keyboard (SDF)</p>
                    <p>My first computer was a Packard Bell with 4MB RAM, double the then-standard!</p>
                    <p>I’ve been to Australia, Cambodia, Czech Republic, Germany, Russia, and Thailand</p>
                    <a href="<?php bloginfo('wpurl') ?>/contact" class="btn btn--orange">Contact me<div class="btn__arrow black right"></div></a>
                </div>
            </aside>
        </div><!-- end of content-wrapper -->
    </section>
<?php get_footer(); ?>