<?php
/*******************************************************************************
* PHP Invoice HTML Supported                                                   *
*                                                                              *
* Version:      1.0                                                            *
* mPDF Version: 7.0.0                                                          *
* Author:       Farjad Tahir	                                    		   *
* Author Site:  http://www.splashpk.com                                        *
* Author Email:  farjad_tahir@splashpk.com                                     *
********************************************************************************/
require __DIR__ . '/lib/vendor/autoload.php';
require __DIR__ . '/mustache/src/Mustache/Autoloader.php';
Mustache_Autoloader::register();
use \Mpdf\Mpdf;

class phpinvoice extends Mpdf  {
	
	// Templates folder and default filename adjustment variables.
    private $template_dir 	 = "/templates";
    private $main_file    	 = "/main.mustache";
    private $mpdfobj      	 = null;
    private $referenceformat = array('.',',');	  /* Currency format */
	// No modification suggested for these two.
    protected $_template	 = '';
    protected $_data    	 = array();

	// Default variables initialized
    public $page_size 		 = "";
    public $currency 		 = "";
    public $logo			 = "";
    public $date			 = "";
    public $time			 = "";		
    public $due				 = "";
    public $from			 = array();
    public $to				 = array();
    public $items			 = array();
    public $totals			 = array();
	public $addText			 = array();
    public $badge			 = "";
    public $footernote		 = "";
    public $curreny_direction = "left";

    /* Class Constructor */
    public function __construct($template = 'basic', $page_size = 'A4', $currency = '$') {
		
        $this->mpdfobj      = new Mpdf(array(
											'', 		 // mode - default ''
											$page_size,  // format - A4, for example, default 'A4'
											0,			 // font size - default 0
											'', 		 // default font family
											15, 		 // margin_left
											15, 		 // margin right
											16, 		 // margin top
											16, 		 // margin bottom
											9, 			 // margin header
											9, 			 // margin footer
											'L'			 // L - landscape, P - portrait
										));
        $this->_template 	= $template;
        $this->page_size 	= $page_size;
        $this->currency 	= html_entity_decode($currency);
    }

    /*
     * __set();
     * return bool
     */
	public function __set($key, $value) {
        $this->_data[$key] = $value;
       return true;
    }
	/*
     * __get();
     * return bool/data
     */
    public function __get($key) {
        return isset($this->_data[$key]) ? $this->_data[$key] : false;
    }

    public function setCurrenyDirection($direction = "left") {
        $this->curreny_direction = $direction;
    }

	public function setType($title) {
		$this->title = $title;
	}
	
    public function setDate($date) {
        $this->date = $date;
    }

    public function setDue($date) {
        $this->due = $date;
    }

    public function setLogo($logo = 0) {
        $this->logo = $logo;
    }

    public function setFrom($data) {
        $this->from = $data;
    }

    public function setTo($data) {
        $this->to = $data;
    }

    public function setReference($reference) {
        $this->reference = $reference;
    }

    public function setNumberFormat($decimals,$thousands_sep) {
        $this->referenceformat = array($decimals,$thousands_sep);
    }

    public function addItem($item , $description = "" , $quantity = 1 , $vat = 0 , $price = 0 , $discount = 0, $week = 1) {
        $p['item'] 			= $item;
		$p['description'] 	= $description;		
		$p['week'] = $week;
		$total_amount		= 0;
		$total_amount 		= (((float)$quantity)*((float)$price)*((float)$week));		
		
		if($vat !== false) {
		  $p['vat']			= $vat;
		  if(is_numeric($vat)) {
			  if($this->curreny_direction == "left") {
			  	$p['vat']		= $this->currency.' '.number_format($vat,2,$this->referenceformat[0],$this->referenceformat[1]);
			  }else {
			  	$p['vat']		= number_format($vat,2,$this->referenceformat[0],$this->referenceformat[1]).' '.$this->currency;
			  }
			$total_amount	= $total_amount + $vat;

		  }else if (strpos($vat, '%') !== false) {
			$vat			= (float) str_replace("%","",$vat);
		  	$vat_amount		= ($vat / 100);
			$vat_amount		= $total_amount * $vat_amount;
			$total_amount	= $total_amount + $vat_amount;
		  }
			$this->vatField = true;
		}
		
		if($discount !== false) {
			$p['discount'] = $discount;
			if(is_numeric($discount)) {
				if($this->curreny_direction == "left") {
					$p['discount']	= $this->currency.' '.number_format($discount,2,$this->referenceformat[0],$this->referenceformat[1]);
				}else{
					$p['discount']	= number_format($discount,2,$this->referenceformat[0],$this->referenceformat[1]).' '.$this->currency;
				}
				$total_amount	= $total_amount - $discount;
			}else if (strpos($discount, '%') !== false) {
				$discount			= (float) str_replace("%","",$discount);
				$discount_amount	= ($discount / 100);
				$discount_amount	= $total_amount * $discount_amount;
				$total_amount		= $total_amount - $discount_amount;
		  	}
			$this->discountField = true;
		}
				
		$p['quantity'] 		= $quantity;
		$p['price']			= $price;
		
		$p['total']			= $total_amount;

		if ($this->curreny_direction == "left") {
			$p['price'] = $this->currency . ' ' . number_format($price, 2, $this->referenceformat[0], $this->referenceformat[1]);
			$p['total'] = $this->currency . ' ' . number_format($total_amount, 2, $this->referenceformat[0], $this->referenceformat[1]);			
        } else {			
			$p['price'] = number_format($price, 2, $this->referenceformat[0], $this->referenceformat[1]) . ' ' . $this->currency;
			$p['total'] = number_format($total_amount, 2, $this->referenceformat[0], $this->referenceformat[1]) . ' ' . $this->currency;
        }
		
		$this->items[]		= $p;
		$this->items_total  += $total_amount;		

    }
	
	public function addTotal($name,$value,$colored = "",$subtract = FALSE) {
      $t['name']  = $name;
      $t['value'] = $value;
      if (is_numeric($value)) {
        if ($this->curreny_direction == "left") {
            $t['value'] = $this->currency . ' ' . number_format($value, 2, $this->referenceformat[0], $this->referenceformat[1]);
        } else {
            $t['value'] = number_format($value, 2, $this->referenceformat[0], $this->referenceformat[1]) . ' ' . $this->currency;
        }
        if ($subtract === TRUE) {
            $this->grand_total -= $value;
        } else {
            $this->grand_total += $value;
        }
      }
      $t['colored']   = $colored;
      $this->totals[] = $t;
      // Make Total Due equal to Balance Due
      if (strtolower($name) == 'total due') $this->balanceDue = $value;      
	}	
	
	public function GetPercentage($percentage) {
		$total		= $this->grand_total;
		if(!empty($total) and !empty($percentage)) {
			$percentage = ($percentage / 100);
			$vat = $total * $percentage;
			return $vat;
		}
	}
	
    public function GetGrandTotal() {
        return $this->grand_total;
    }

	public function addTitle($title) {
		$this->addText[] = "<h3>$title</h3>";
	}
	
	public function addParagraph($paragraph) {
		$this->addText[] = "<p>$paragraph</p>";
	}
	
	public function addBadge($badge) {
		$this->badge = $badge;
	}
	
	public function setFooternote($note) {
		$this->footernote = $note;
	}

    public function render($filename = "invoice",$action = "") {
    		
		$m = new Mustache_Engine(array(
			'loader' => new Mustache_Loader_FilesystemLoader(dirname(__FILE__) . $this->template_dir),
		));
		$tpl = $m->loadTemplate($this->_template. $this->main_file);			
		$template_output = $tpl->render(array(
			'title'				=> $this->title,
			'reference'			=> $this->reference,
			'invoice_date'		=> $this->date,
			'due_date'			=> $this->due,
			'from'				=> $this->from,
			'to'				=> $this->to,
			'items' 			=> $this->items,
			'totals' 			=> $this->totals,
			'logo'				=> $this->logo,
			'footer_details' 	=> $this->addText,
			'custom'			=> $this->_data
		));
				
        $this->mpdfobj->SetFooter($this->footernote.' | Costy Corporation | Page No.{PAGENO}');
		if(isset($this->badge) and !empty($this->badge)) {
			$this->mpdfobj->SetWatermarkText($this->badge,0.1);
			$this->mpdfobj->showWatermarkText = true;
			$this->mpdfobj->watermark_font = 'ZawgyiOne';
		}
		
		//echo $template_output;
		//die;
		
        $this->mpdfobj->WriteHTML($template_output);
		$this->mpdfobj->Output($filename,$action);
    }
}
?>